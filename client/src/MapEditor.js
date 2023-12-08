import React, { Component, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ObjectType } from './models/map-models';
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

export const MapEditor = () => {
	const [map, setMap] = useState();
	const [spaceMap, setSpaceMap] = useState();
	//const [distanceMap, setDistanceMap] = useState();
	const [timer, setTimer] = useState();
	const [settings, setSettigns] = useState();
	const [selectedObject, setSelectedObject] = useState();
	const [canvas, setCanvas] = useState();
	const [objects, setObjects] = useState();

	const distanceMap = useRef();
	const newConnection = useRef();
	const mousePos = useRef();
	const highlightedObject = useRef();

	const { mapId } = useParams();

	console.log('Rerender');

	useEffect(() => {
		return () => {
			clearInterval(timer);
		};
	}, [timer]);

	useEffect(() => {
		if (mapId) {
			const handleMapLoad = async () => {
				setMap(await loadMap(mapId));
			};
			handleMapLoad();
		}
	}, [mapId]);

	useEffect(() => {
		if (map) {
			const hasSpaces = map.spaces && map.spaces.length > 0;
			const { spaceMap, objects } = setupSpaces(
				hasSpaces ? map.spaces : undefined,
				[],
				map.drawOptions
			);
			const settings = setupSettings(
				map.spaceGroups ? map.spaceGroups : []
			);

			setObjects(objects);

			const canvas = document.getElementById('canvasEditor');
			const ctx = canvas.getContext('2d');

			drawMap(map.drawOptions.backgroundImageUrl);
			const animationTimer = setInterval(() => {
				redraw(
					canvas,
					ctx,
					spaceMap,
					map.drawOptions.spaceColor,
					mousePos.current,
					newConnection.current,
					distanceMap.current,
					settings
				);
			}, 30);

			setTimer(animationTimer);
			setSettigns(settings);
			setMap(map);
			setSpaceMap(spaceMap);
			setCanvas(canvas);

			document.addEventListener('keyup', (event) => {
				var key = event.key.toLowerCase();
				if (key == 'delete') {
					const obj = selectedObject || highlightedObject.current;
					const connections = obj.connections;
					obj.delete();
					for (let space of connections) {
						space.connections = space.connections.filter(
							(space2) => space2.id != obj.id
						);
					}
					setSelectedObject(null);
					highlightedObject.current = null;
					renumberSpaces(spaceMap, settings);
				}
				if (key == 'a') {
					//selectPoints();
				}
				if (key == '1') {
					if (selectedObject || highlightedObject.current) {
						newConnection.current = {
							isTwoWay: false,
							fromSpace:
								selectedObject || highlightedObject.current,
						};
					}
				} else if (key == '2') {
					if (selectedObject || highlightedObject.current) {
						newConnection.current = {
							isTwoWay: true,
							fromSpace:
								selectedObject || highlightedObject.current,
						};
					}
				} else {
					newConnection.current = null;
				}
				if (key == 'escape') {
					newConnection.current = null;
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
					if (curObject.objectType == ObjectType.Space) {
						if (isMouseInObject(newMousePos, curObject)) {
							if (
								highlightedObject.current?.id !== curObject.id
							) {
								highlightedObject.current = curObject;
								curObject.highlight();
								break;
							}
						} else {
							if (highlightedObject.current) {
								highlightedObject.current = null;
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
						newConnection.current.fromSpace.id !==
						highlightedObject.current.id
					) {
						newConnection.current.fromSpace.connections.push(
							highlightedObject.current
						);
						if (newConnection.current.isTwoWay) {
							highlightedObject.current.connections.push(
								newConnection.current.fromSpace
							);
						}
						newConnection.current = null;
					}
				} else {
					if (selectedObject) {
						selectedObject.deselect();
					}
					highlightedObject.current.select();

					setSelectedObject(highlightedObject.current);
				}
			} else {
				if (selectedObject) {
					selectedObject.deselect();
				}
				setSelectedObject(null);
			}
		});
	}

	const isMouseInObject = (mousePos, obj) => {
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

	const loadImage = (imageUrl, width, height) =>
		new Promise((resolve, reject) => {
			let image;
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

	const drawMap = (backgroundImageUrl) => {
		const canvas = document.getElementById('mapLayer');
		const ctx = canvas.getContext('2d');
		loadImage(backgroundImageUrl, canvas.width, canvas.height)
			.then((image) => {
				redrawMap(canvas, ctx, image);
			})
			.catch((err) => {
				console.log(err);
				clearCanvas(canvas, ctx);
			});
	};

	const updateDistances = (newDistances) => {
		//setDistanceMap(distanceMap);
		console.log('Update distances: ', newDistances);
		distanceMap.current = newDistances;
	};

	const disableDistances = () => {
		//setDistanceMap(null);
		distanceMap.current = null;
	};

	return map ? (
		<div>
			<ToolMenu
				map={map}
				spaceMap={spaceMap}
				settings={settings}
				onUpdateBackgroundImage={(backgroundImageUrl) =>
					drawMap(backgroundImageUrl)
				}
				selectedObject={selectedObject}
				onGenerateDistances={(newDistances) =>
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
