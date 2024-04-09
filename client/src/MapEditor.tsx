import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ObjectType } from './models/object';
import {
	redraw,
	setupSpaces,
	renumberSpaces,
	updateMousePos,
} from './utils/canvas';
import { connectSpaces, deleteSpace } from './utils/requests';
import { Space } from './models/space';
import { MousePos } from './models/mouse-pos';
import { loadImage, toDataURL } from './utils/image';
import { useQuery } from '@apollo/client';
import {
	LoadMapDocument,
	LoadMapQuery,
	SpaceTypesDocument,
} from './graphql/__generated__/graphql';
import { useTour } from '@reactour/tour';
import { useSdUser } from './contexts/user-context';
import { initializeSpaceTypes } from './utils/space-types';
import { useMapContext } from './utils/map-context';
import { ToolsDrawer } from './components/drawer/tools-drawer';

export const MapEditor = () => {
	const [map, setMap] = useState<LoadMapQuery['map']>();
	const [timer, setTimer] = useState<NodeJS.Timeout>();
	const [selectedSpace, setSelectedSpace] = useState<Space>();
	const [canvas, setCanvas] = useState<HTMLCanvasElement>();
	const [objects, setObjects] = useState<any[]>([]);
	const [isDragging, setIsDragging] = useState(false);

	const selectedObject = useRef<Space>();
	const highlightedObject = useRef<Space>();

	const { user } = useSdUser();
	const { mapId } = useParams();
	const { setIsOpen, setCurrentStep } = useTour();
	const {
		canvasWidth,
		canvasHeight,
		distanceMap,
		mapCanvas,
		mapCtx,
		mousePos,
		newConnection,
		spaceMap,
		clearBackground,
		setBackgroundImage,
		setBackgroundCanvas,
		setMapCanvas,
		setOutputCanvas,
		setSpaceColor,
		setSpaceMap,
	} = useMapContext();

	const { data } = useQuery(LoadMapDocument, {
		variables: { id: mapId! },
		skip: !mapId,
	});

	const { data: spaceTypesData } = useQuery(SpaceTypesDocument);

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
		if (spaceTypesData?.spaceTypes && map?.settings.spaceRadius) {
			initializeSpaceTypes(spaceTypesData.spaceTypes, map.settings.spaceRadius);
		}
	}, [map, spaceTypesData]);

	useEffect(() => {
		const backgroundCanvas = document.getElementById(
			'mapLayer'
		) as HTMLCanvasElement;

		const mapCanvas = document.getElementById(
			'canvasEditor'
		) as HTMLCanvasElement;

		const outputCanvas = document.getElementById(
			'outputImage'
		) as HTMLCanvasElement;

		if (mapCanvas && backgroundCanvas && outputCanvas) {
			setBackgroundCanvas(backgroundCanvas);
			setMapCanvas(mapCanvas);
			setOutputCanvas(outputCanvas);
		}

		if (map?.settings.spaceColor) {
			setSpaceColor(map.settings.spaceColor);
		}
	}, [map]);

	useEffect(() => {
		if (map && mapCanvas && mapCtx) {
			if (user && !user?.viewedSetup) {
				setCurrentStep(1);
				setIsOpen(true);
			}
			const { spaceMap, objects } = setupSpaces(map.spaces, map.settings);

			setObjects(objects);

			if (map.spaceGroups) {
				renumberSpaces(spaceMap, map.spaceGroups);
			}

			if (map.settings.backgroundImageUrl) {
				generateMapImage(map.settings.backgroundImageUrl);
			}

			setMap(map);
			setSpaceMap(spaceMap);
			setCanvas(mapCanvas);

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
	}, [map, mapCanvas, mapCtx]);

	if (canvas) {
		canvas.addEventListener('mousemove', (event) => {
			const newMousePos = updateMousePos(event, canvas, mousePos.current);
			//mousePos.current.x = { x: newMousePos.x, y: newMousePos.y };

			for (let curObject of objects) {
				curObject.unHighlight();
				if (curObject.objectType == ObjectType.SPACE) {
					if (isMouseInObject(mousePos.current, curObject)) {
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
		});

		canvas.addEventListener('mousedown', (event) => {
			updateMousePos(event, canvas, mousePos.current);

			if (isMouseInObject(mousePos.current, highlightedObject.current)) {
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
			updateMousePos(event, canvas, mousePos.current);

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
					if (
						(highlightedObject.current.isDeleted ||
							newConnection.current.fromSpace.isDeleted) &&
						spaceMap
					) {
						if (highlightedObject.current.isDeleted) {
							highlightedObject.current.revive();
						}
						if (newConnection.current.fromSpace.isDeleted) {
							newConnection.current.fromSpace.revive();
						}
						renumberSpaces(spaceMap, map?.spaceGroups ?? []);
					}
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

	const generateMapImage = (backgroundImageUrl: string) => {
		toDataURL(backgroundImageUrl, (b64Image) => {
			loadImage(String(b64Image), canvasWidth, canvasHeight)
				.then((image) => {
					setBackgroundImage(image);
				})
				.catch((err) => {
					console.log(err);
					clearBackground();
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
			<ToolsDrawer
				activeSpace={selectedSpace}
				map={map}
				spaceMap={spaceMap!}
				onUpdateBackgroundImage={(backgroundImageUrl: string) =>
					generateMapImage(backgroundImageUrl)
				}
				onGenerateDistances={(newDistances: Map<number, number>) =>
					updateDistances(newDistances)
				}
				onDisableDistances={() => disableDistances()}
			/>

			<h1>{map.title}</h1>
			<div style={{ position: 'relative' }}>
				<canvas
					id='outputImage'
					width='7200'
					height='7200'
					style={{
						position: 'absolute',
						top: '0',
						zIndex: '0',
						visibility: 'hidden',
						display: 'none',
					}}
				/>
				<canvas
					id='mapLayer'
					width={canvasWidth}
					height={canvasHeight}
					style={{
						position: 'absolute',
						top: '0',
						border: '2px solid #000',
						zIndex: '5',
					}}
				/>
				<canvas
					id='canvasEditor'
					width={canvasWidth}
					height={canvasHeight}
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
