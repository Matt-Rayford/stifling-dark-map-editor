import React, { Component } from 'react';
import { ObjectType } from './models/map-models';
import ToolMenu from './ToolMenu';
import {
	getMousePos,
	redraw,
	redrawMap,
	setupSpaces,
	clearCanvas,
	drawNewConnection,
	setupSettings,
	renumberSpaces,
} from './utils/canvas';
import { loadMap } from './utils/requests';

export class MapEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			map: {},
			spaceMap: undefined,
			canvas: undefined,
			ctx: undefined,
			isDragging: false,
			mousePos: { x: -1, y: -1 },
			timer: undefined,
			highlightedObject: null,
			selectedObject: null,
			newConnection: null,
			distanceMap: null,
		};
	}

	async componentDidMount() {
		const { mapId } = this.props.match.params;
		if (mapId) {
			const map = await loadMap(mapId);
			const hasSpaces = map.spaces && map.spaces.length > 0;
			const { spaceMap, objects } = setupSpaces(
				hasSpaces ? map.spaces : undefined,
				[],
				map.drawOptions
			);
			const settings = setupSettings(
				map.spaceGroups ? map.spaceGroups : []
			);

			const canvas = document.getElementById('canvasEditor');
			const ctx = canvas.getContext('2d');

			this.drawMap(map.drawOptions.backgroundImageUrl);
			const timer = setInterval(() => {
				const { mousePos, newConnection, distanceMap, settings } =
					this.state;
				redraw(
					canvas,
					ctx,
					spaceMap,
					map.drawOptions.spaceColor,
					mousePos,
					newConnection,
					distanceMap,
					settings
				);
			}, 30);
			this.setState({ map, spaceMap, canvas, ctx, timer, settings });

			canvas.addEventListener('mousemove', (event) => {
				const { newConnection } = this.state;
				const mousePos = getMousePos(event, canvas);
				this.state.mousePos.x = mousePos.x;
				this.state.mousePos.y = mousePos.y;

				for (let curObject of objects) {
					if (!curObject.isDeleted) {
						curObject.unHighlight();
						if (curObject.objectType == ObjectType.Space) {
							if (this.isMouseInObject(mousePos, curObject)) {
								if (
									!this.state.highlightedObject ||
									this.state.highlightedObject.id !=
										curObject.id
								)
									this.setState({
										highlightedObject: curObject,
									});
								curObject.highlight();
								break;
							} else {
								if (this.state.highlightedObject)
									this.setState({ highlightedObject: null });
							}
						}
					}
				}
			});
			canvas.addEventListener('mousedown', (event) => {
				const mousePos = getMousePos(event, canvas);
				const { highlightedObject, selectedObject, newConnection } =
					this.state;

				if (this.isMouseInObject(mousePos, highlightedObject)) {
					if (newConnection) {
						if (
							newConnection.fromSpace.id !== highlightedObject.id
						) {
							newConnection.fromSpace.connections.push(
								highlightedObject
							);
							if (newConnection.isTwoWay) {
								highlightedObject.connections.push(
									newConnection.fromSpace
								);
							}
							this.setState({ newConnection: null });
						}
					}
					if (!newConnection) {
						if (selectedObject) selectedObject.deselect();
						highlightedObject.select();
						this.setState({ selectedObject: highlightedObject });
					}
				} else {
					if (selectedObject) selectedObject.deselect();
					this.setState({ selectedObject: null });
				}
			});
			document.addEventListener('keyup', (event) => {
				const { highlightedObject, selectedObject, settings } =
					this.state;
				var key = event.key.toLowerCase();
				if (key == 'delete') {
					const obj = selectedObject || highlightedObject;
					const connections = obj.connections;
					obj.delete();
					for (let space of connections) {
						space.connections = space.connections.filter(
							(space2) => space2.id != obj.id
						);
					}
					this.setState({
						selectedObject: null,
						highlightedObject: null,
					});
					renumberSpaces(spaceMap, settings);
				}
				if (key == 'a') {
					//selectPoints();
				}
				if (key == '1') {
					if (selectedObject || highlightedObject) {
						this.setState({
							newConnection: {
								isTwoWay: false,
								fromSpace: selectedObject || highlightedObject,
							},
						});
					}
				} else if (key == '2') {
					if (selectedObject || highlightedObject) {
						this.setState({
							newConnection: {
								isTwoWay: true,
								fromSpace: selectedObject || highlightedObject,
							},
						});
					}
				} else this.setState({ newConnection: null });
				if (key == 'escape') {
					this.setState({ newConnection: null });
				}
			});
		} else {
			return null;
		}
	}

	isMouseInObject(mousePos, obj) {
		if (!obj) return false;
		return (
			mousePos.x > obj.center.x - obj.radius &&
			mousePos.x < obj.center.x + obj.radius &&
			mousePos.y > obj.center.y - obj.radius &&
			mousePos.y < obj.center.y + obj.radius
		);
	}

	componentWillUnmount() {
		const { timer } = this.state;
		clearInterval(timer);
	}

	loadImage = (imageUrl, width, height) =>
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

	drawMap = (backgroundImageUrl) => {
		const canvas = document.getElementById('mapLayer');
		const ctx = canvas.getContext('2d');
		this.loadImage(backgroundImageUrl, canvas.width, canvas.height)
			.then((image) => {
				redrawMap(canvas, ctx, image);
			})
			.catch((err) => {
				console.log(err);
				clearCanvas(canvas, ctx);
			});
	};

	updateDistances = (distanceMap) => {
		this.setState({ distanceMap: distanceMap });
	};
	disableDistances = () => {
		this.setState({ distanceMap: null });
	};

	render() {
		const { map, spaceMap, selectedObject, settings } = this.state;

		return map ? (
			<div>
				<ToolMenu
					map={map}
					spaceMap={spaceMap}
					settings={settings}
					onUpdateBackgroundImage={(backgroundImageUrl) =>
						this.drawMap(backgroundImageUrl)
					}
					selectedObject={selectedObject}
					onGenerateDistances={(distanceMap) =>
						this.updateDistances(distanceMap)
					}
					onDisableDistances={() => this.disableDistances()}
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
	}
}
