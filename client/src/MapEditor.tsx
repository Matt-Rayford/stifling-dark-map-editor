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
	renumberSpaces,
} from './utils/canvas';
import { connectSpaces, deleteSpace } from './utils/requests';
import { Space } from './models/space';
import { MousePos } from './models/mouse-pos';
import { NewConnection } from './models/connection';
//import { SDMap } from './models/map';
import { loadImage, toDataURL } from './utils/image';
import { useQuery } from '@apollo/client';
import { LoadMapDocument, LoadMapQuery } from './graphql/__generated__/graphql';

export const MapEditor = () => {
	const [map, setMap] = useState<LoadMapQuery['map']>();
	const [spaceMap, setSpaceMap] = useState<Map<number, Space>>();
	const [timer, setTimer] = useState<NodeJS.Timeout>();
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

	const { data } = useQuery(LoadMapDocument, {
		variables: { id: mapId! },
		skip: !mapId,
	});

	useEffect(() => {
		return () => {
			clearInterval(timer);
		};
	}, [timer]);

	useEffect(() => {
		if (data?.map) {
			setMap(data.map);
		}
	}, [data]);

	useEffect(() => {
		if (map) {
			const { spaceMap, objects } = setupSpaces(map.spaces, map.settings);

			setObjects(objects);

			if (map.spaceGroups) {
				renumberSpaces(spaceMap, map.spaceGroups);
			}

			//@ts-ignore
			const canvas: HTMLCanvasElement =
				document.getElementById('canvasEditor')!;
			const ctx = canvas.getContext('2d')!;

			if (map.settings.backgroundImageUrl) {
				drawMap(map.settings.backgroundImageUrl);
			}
			const animationTimer = setInterval(() => {
				redraw(
					canvas,
					ctx,
					spaceMap,
					map.settings.spaceColor,
					mousePos.current ?? { x: 0, y: 0 },
					newConnection.current,
					distanceMap.current
				);
			}, 30);

			setTimer(animationTimer);
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
						if (map.spaceGroups) {
							renumberSpaces(spaceMap, map.spaceGroups);
						}
						deleteSpace(map.id, obj.id);
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
					connectSpaces(
						newConnection.current.fromSpace.id,
						highlightedObject.current.id
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

	const drawMap = (backgroundImageUrl: string) => {
		//@ts-ignore
		const canvas: HTMLCanvasElement = document.getElementById('mapLayer')!;
		const ctx = canvas.getContext('2d')!;
		toDataURL(backgroundImageUrl, (b64Image) => {
			loadImage(String(b64Image), canvas.width, canvas.height)
				.then((image) => {
					redrawMap(canvas, ctx, image as CanvasImageSource);
				})
				.catch((err) => {
					console.log(err);
					clearCanvas(canvas, ctx);
				});
		});
	};

	const updateDistances = (newDistances: Map<number, number>) => {
		distanceMap.current = newDistances;
	};

	const disableDistances = () => {
		distanceMap.current = undefined;
	};

	if (!map) {
		return <span>Loading map data...</span>;
	}

	return (
		<div>
			<ToolMenu
				map={map}
				spaceMap={spaceMap!}
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
				/>
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
				/>
			</div>
		</div>
	);
};
