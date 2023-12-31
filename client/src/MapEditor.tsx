import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ObjectType } from './models/object';
import ToolMenu from './ToolMenu';
import {
	getMousePos,
	redraw,
	redrawMap,
	setupSpaces,
	clearCanvas,
	setupSettings,
	renumberSpaces,
} from './utils/canvas';
import { loadMap } from './utils/requests';
import { Space } from './models/space';
import { MousePos } from './models/mouse-pos';
import { NewConnection } from './models/connection';
import { SDMap } from './models/map';

export const MapEditor = () => {
	const [map, setMap] = useState<SDMap>();
	const [spaceMap, setSpaceMap] = useState<Map<number, Space>>();
	const [timer, setTimer] = useState<NodeJS.Timeout>();
	const [settings, setSettings] = useState<any>();
	const [selectedSpace, setSelectedSpace] = useState<Space>();
	const [canvas, setCanvas] = useState<HTMLCanvasElement>();
	const [objects, setObjects] = useState<any[]>([]);
	const [isDragging, setIsDragging] = useState(false);

	const distanceMap = useRef<Map<number, number>>();
	const newConnection = useRef<NewConnection>();
	const mousePos = useRef<MousePos>();
	const selectedObject = useRef<Space>();
	const highlightedObject = useRef<Space>();

	const { mapId } = useParams();

	useEffect(() => {
		return () => {
			clearInterval(timer);
		};
	}, [timer]);

	useEffect(() => {
		if (mapId) {
			loadMap(mapId).then((sdMap) => {
				setMap(sdMap);
			});
		}
	}, [mapId]);

	useEffect(() => {
		if (map) {
			const hasSpaces = map.spaces && map.spaces.length > 0;
			const { spaceMap, objects } = setupSpaces(
				hasSpaces ? map.spaces : undefined,
				map.mapSettings
			);
			const settings = setupSettings(map.spaceGroups ? map.spaceGroups : []);

			setObjects(objects);

			//@ts-ignore
			const canvas: HTMLCanvasElement =
				document.getElementById('canvasEditor')!;
			const ctx = canvas.getContext('2d')!;

			drawMap(map.mapSettings.backgroundImageUrl);
			const animationTimer = setInterval(() => {
				redraw(
					canvas,
					ctx,
					spaceMap,
					map.mapSettings.spaceColor,
					mousePos.current ?? { x: 0, y: 0 },
					newConnection.current,
					distanceMap.current,
					settings
				);
			}, 30);

			setTimer(animationTimer);
			setSettings(settings);
			setMap(map);
			setSpaceMap(spaceMap);
			setCanvas(canvas);

			document.addEventListener('keyup', (event) => {
				var key = event.key.toLowerCase();
				if (key == 'delete') {
					const obj = selectedObject.current || highlightedObject.current;
					if (obj) {
						const connections = obj.connections;
						obj.delete();
						for (let space of connections) {
							space.connections = space.connections.filter(
								(space2) => space2.id != obj.id
							);
						}
						setSelectedSpace(undefined);
						selectedObject.current = undefined;
						highlightedObject.current = undefined;
						renumberSpaces(spaceMap, settings);
					}
				}
				if (key == 'a') {
					//selectPoints();
				}
				if (key == '1') {
					if (selectedObject || highlightedObject.current) {
						newConnection.current = {
							isTwoWay: false,
							fromSpace: selectedObject.current ?? highlightedObject.current!,
						};
					}
				} else if (key == '2') {
					if (selectedObject || highlightedObject.current) {
						newConnection.current = {
							isTwoWay: true,
							fromSpace: selectedObject.current ?? highlightedObject.current!,
						};
					}
				} else {
					newConnection.current = undefined;
				}
				if (key == 'escape') {
					newConnection.current = undefined;
				}
			});
		}
	}, [map]);

	if (canvas) {
		canvas.addEventListener('mousemove', (event) => {
			const newMousePos = getMousePos(event, canvas);
			mousePos.current = { x: newMousePos.x, y: newMousePos.y };

			for (let curObject of objects) {
				if (!curObject.isDeleted) {
					curObject.unHighlight();
					if (curObject.objectType == ObjectType.SPACE) {
						if (isMouseInObject(newMousePos, curObject)) {
							if (highlightedObject.current?.id !== curObject.id) {
								highlightedObject.current = curObject;
								curObject.highlight();
								break;
							}
						} else {
							if (highlightedObject.current) {
								highlightedObject.current = undefined;
							}
						}
					}
				}
			}
		});

		canvas.addEventListener('mousedown', (event) => {
			const newMousePos = getMousePos(event, canvas);
			mousePos.current = { x: newMousePos.x, y: newMousePos.y };

			if (isMouseInObject(newMousePos, highlightedObject.current)) {
				if (newConnection.current) {
					if (
						highlightedObject.current &&
						newConnection.current.fromSpace.id !== highlightedObject.current.id
					) {
						newConnection.current.fromSpace.connections.push(
							highlightedObject.current
						);
						if (newConnection.current.isTwoWay) {
							highlightedObject.current.connections.push(
								newConnection.current.fromSpace
							);
						}
						newConnection.current = undefined;
					}
				} else {
					if (selectedObject.current) {
						selectedObject.current.deselect();
					}
					if (highlightedObject.current) {
						highlightedObject.current.select();
					}

					newConnection.current = {
						isTwoWay: true,
						fromSpace: highlightedObject.current!,
					};
					setSelectedSpace(highlightedObject.current);
					selectedObject.current = highlightedObject.current;
					setIsDragging(true);
				}
			} else {
				if (selectedObject.current) {
					selectedObject.current.deselect();
				}
				setSelectedSpace(undefined);
				selectedObject.current = undefined;
			}
		});

		canvas.addEventListener('mouseup', (event) => {
			const newMousePos = getMousePos(event, canvas);
			mousePos.current = { x: newMousePos.x, y: newMousePos.y };

			if (
				newConnection &&
				highlightedObject.current &&
				newConnection.current &&
				highlightedObject.current &&
				newConnection.current.fromSpace.id !== highlightedObject.current.id
			) {
				newConnection.current.fromSpace.connections.push(
					highlightedObject.current
				);
				if (newConnection.current.isTwoWay) {
					highlightedObject.current.connections.push(
						newConnection.current.fromSpace
					);
				}
				newConnection.current = undefined;
			} else {
				newConnection.current = undefined;
			}
		});
	}

	const isMouseInObject = (mousePos: MousePos, obj: any) => {
		if (!obj) {
			return false;
		}

		return (
			mousePos.x > obj.center.x - obj.radius &&
			mousePos.x < obj.center.x + obj.radius &&
			mousePos.y > obj.center.y - obj.radius &&
			mousePos.y < obj.center.y + obj.radius
		);
	};

	const loadImage = (imageUrl: string, width: number, height: number) =>
		new Promise((resolve, reject) => {
			let image: HTMLImageElement;
			if (imageUrl) {
				image = new Image(width, height);
				image.src = `${process.env.PUBLIC_URL}${imageUrl}`;
				image.onload = () => {
					resolve(image);
				};
				image.onerror = () => {
					reject(`ERROR: Could not find image at ${imageUrl}`);
				};
			}
		});

	const drawMap = (backgroundImageUrl: string) => {
		//@ts-ignore
		const canvas: HTMLCanvasElement = document.getElementById('mapLayer')!;
		const ctx = canvas.getContext('2d')!;
		loadImage(backgroundImageUrl, canvas.width, canvas.height)
			.then((image) => {
				redrawMap(canvas, ctx, image as CanvasImageSource);
			})
			.catch((err) => {
				console.log(err);
				clearCanvas(canvas, ctx);
			});
	};

	const updateDistances = (newDistances: Map<number, number>) => {
		distanceMap.current = newDistances;
	};

	const disableDistances = () => {
		distanceMap.current = undefined;
	};

	return map ? (
		<div>
			<ToolMenu
				map={map}
				spaceMap={spaceMap!}
				settings={settings}
				onUpdateBackgroundImage={(backgroundImageUrl: string) =>
					drawMap(backgroundImageUrl)
				}
				selectedObject={selectedSpace}
				onGenerateDistances={(newDistances: Map<number, number>) =>
					updateDistances(newDistances)
				}
				onDisableDistances={() => disableDistances()}
			/>
			<h1>{map.title}</h1>
			<div style={{ position: 'relative' }}>
				<canvas
					id='mapLayer'
					width='1310'
					height='1310'
					style={{
						position: 'absolute',
						top: '0',
						border: '2px solid #000',
						zIndex: '0',
					}}
				></canvas>
				<canvas
					id='canvasEditor'
					width='1310'
					height='1310'
					style={{
						position: 'absolute',
						top: '0',
						border: '2px solid #000',
						zIndex: '10',
					}}
				></canvas>
			</div>
		</div>
	) : (
		<span>Loading map data...</span>
	);
};
