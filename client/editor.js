// Canvas and drawing map
const ROWS = 24;
const COLS = 21;
var circleRadius = 20;
var canvas = document.getElementById('canvasEditor');
var ctx = canvas.getContext('2d');
var padding = 40;
var lastX = 0;
var lastY = 0;
var isDragging = false;

var spaceMap = new Map();
var imageMap = new Map();
var allObjects = [];
var highlightedObject = undefined;
var selectedObject = undefined;

var selectingPointA = false;
var selectingPointB = false;
var pointA = undefined;
var pointB = undefined;
var visitedMap = new Map();
var curShortestPath = [];
var showAllPaths = false;
var mousePos = { x: 0, y: 0 };

var mouseDrawing = undefined;
var drawOneWay = false;
var drawTwoWay = false;
var linkStart = undefined;
var linkEnd = undefined;

const ObjectType = {
	Space: 'space',
};
const SpaceType = {
	BASIC: {
		name: 'Basic Movement Space',
		fontColor: '#000000',
		enumVal: 'BASIC',
	},
	ITEM: {
		name: 'Item Space',
		image: 'item-space',
		fontColor: '#FFFFFF',
		enumVal: 'ITEM',
	},
	OBJECTIVE: {
		name: 'Objective Item',
		image: 'objective-space',
		fontColor: '#FFFFFF',
		enumVal: 'OBJECTIVE',
	},
	ADVERSARY: {
		name: 'Adversary',
		image: 'adversary-space',
		fontColor: '#FFFFFF',
		enumVal: 'ADVERSARY',
	},
	STARTING: {
		name: 'Starting',
		image: 'start-space',
		fontColor: '#000000',
		enumVal: 'STARTING',
	},
	INTERACTION: {
		name: 'Interaction',
		image: 'interaction-space',
		fontColor: '#FFFFFF',
		enumVal: 'INTERACTION',
	},
	ESCAPE: {
		name: 'Escape',
		image: 'escape-space',
		fontColor: '#FFFFFF',
		enumVal: 'ESCAPE',
	},
	INVOLVED: {
		name: 'Involved Action Space',
		image: 'involved-space',
		fontColor: '#FFFFFF',
		enumVal: 'INVOLVED',
	},
	DOOR: {
		name: 'Door',
		image: 'door-space',
		fontColor: '#000000',
		enumVal: 'DOOR',
	},
};
const LightLevel = {
	BRIGHT: { name: 'Bright Space', movementCost: 1, enumVal: 'BRIGHT' },
	DIM: { name: 'Dim Space', movementCost: 1, enumVal: 'DIM' },
	PITCH_BLACK: {
		name: 'Pitch Black Space',
		movementCost: 2,
		enumVal: 'PITCH_BLACK',
	},
};

class Connection {
	constructor(startX, startY, endX, endY) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
	}
}
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
class DrawOptions {
	constructor() {
		this.color = '#000000';
		this.width = 2;
	}
}
class Space {
	baseColor = '#000000';
	baseWidth = 1;

	constructor(id, x, y, type, lightLevel, number, row, col) {
		this.id = id;
		this.center = new Point(x, y);
		this.spaceType = type.name ? type : SpaceType[type];
		this.lightLevel = lightLevel.name ? lightLevel : LightLevel[lightLevel];
		this.number = number;
		this.radius = circleRadius;
		this.objectType = ObjectType.Space;
		this.drawOptions = new DrawOptions();
		this.connections = [];
		this.row = row;
		this.col = col;
		this.hasCustomOptions = false;
	}

	highlight() {
		this.drawOptions.color = '#E81C0E';
		this.drawOptions.width = 3;
		highlightedObject = this;
	}
	unHighlight() {
		if (!selectedObject) {
			this.drawOptions.color = this.baseColor;
			this.drawOptions.width = this.baseWidth;
		} else if (selectedObject.id != this.id) {
			this.drawOptions.color = this.baseColor;
			this.drawOptions.width = this.baseWidth;
		} else if (selectedObject.id == this.id) this.select();
		highlightedObject = undefined;
	}
	select() {
		this.drawOptions.color = '#D66860';
		this.drawOptions.width = 3;
		this.selectedObject = this;
		this.highlightedObject = undefined;
	}
	deselect() {
		this.drawOptions.color = this.baseColor;
		this.drawOptions.width = this.baseWidth;
		this.selectedObject = undefined;
	}

	setCustomDrawOptions(color, width) {
		this.hasCustomOptions = true;
		this.drawOptions.color = color;
		this.drawOptions.width = width;
		this.baseColor = color;
		this.baseWidth = width;
	}
	resetDrawOptions() {
		this.hasCustomOptions = false;
		this.drawOptions.color = '#000000';
		this.drawOptions.width = 1;
		this.baseColor = '#000000';
		this.baseWidth = 1;
	}

	getHtmlInfo() {
		return (
			'Number: ' +
			this.number +
			'<br />' +
			'Type: ' +
			this.spaceType.name +
			'<br />' +
			'Row: ' +
			this.row +
			'<br />' +
			'Col: ' +
			this.col +
			'<br />' +
			'Connections: ' +
			'<br />' +
			'<ul>' +
			this.getConnectionsHtml() +
			'</ul>'
		);
	}
	getConnectionsHtml() {
		var conString = '';
		this.connections.sort(function (a, b) {
			return a.id < b.id ? -1 : 1;
		});
		for (let i = 0; i < this.connections.length; i++)
			conString +=
				'<li>' +
				this.connections[i].number +
				' <button type="button" onclick="deleteConnection(' +
				this.id +
				', ' +
				this.connections[i].id +
				', true)">X (<->)</button>' +
				' <button type="button" onclick="deleteConnection(' +
				this.id +
				', ' +
				this.connections[i].id +
				', false)">X (->)</li>';
		return conString;
	}
}

canvas.addEventListener('mousemove', function (event) {
	updateMousePos(event);
	if (!isDragging) {
		if (!highlightedObject) {
			for (let i = 0; i < allObjects.length; i++) {
				var curObject = allObjects[i];
				if (curObject.objectType == ObjectType.Space) {
					if (
						event.offsetX > curObject.center.x - curObject.radius &&
						event.offsetX < curObject.center.x + curObject.radius &&
						event.offsetY > curObject.center.y - curObject.radius &&
						event.offsetY < curObject.center.y + curObject.radius
					) {
						curObject.highlight();
						break;
					} else curObject.unHighlight();
				}
			}
		} else {
			if (
				event.offsetX >
					highlightedObject.center.x - highlightedObject.radius &&
				event.offsetX <
					highlightedObject.center.x + highlightedObject.radius &&
				event.offsetY >
					highlightedObject.center.y - highlightedObject.radius &&
				event.offsetY <
					highlightedObject.center.y + highlightedObject.radius
			) {
				// do nothing.
			} else highlightedObject.unHighlight();
		}
	}
});
canvas.addEventListener(
	'mousedown',
	function (event) {
		if (highlightedObject) {
			if (selectedObject) selectedObject.deselect();
			selectedObject = highlightedObject;
			selectedObject.select();
			document.getElementById('info').innerHTML =
				selectedObject.getHtmlInfo();

			if (selectingPointA) {
				selectingPointA = false;
				selectingPointB = true;
				pointA = selectedObject;
				document.getElementById('pointA').innerHTML = pointA.number;
			} else if (selectingPointB) {
				selectingPointB = false;
				canvas.style.cursor = 'auto';
				pointB = selectedObject;
				document.getElementById('pointB').innerHTML = pointB.number;
				var pathInfo = shortestPath(pointA, pointB);
				document.getElementById('shortestLength').innerHTML =
					pathInfo.length;
				document.getElementById('pathText').innerHTML =
					pathInfo.pathString;
			}

			if (drawOneWay || drawTwoWay) {
				linkEnd = highlightedObject || selectedObject;
				addConnection(linkStart, linkEnd, drawTwoWay);
				drawOneWay = false;
				drawTwoWay = false;
			}
		}
	},
	false
);
canvas.addEventListener('mouseUp', function (event) {});
function deleteSelected() {
	if (selectedObject) {
		this.resetPaths();
		switch (selectedObject.objectType) {
			case ObjectType.Space:
				for (var c = 0; c < selectedObject.connections.length; c++) {
					var conSpace = selectedObject.connections[c];
					conSpace.connections = conSpace.connections.filter(
						(s) => s.id != selectedObject.id
					);
				}
				spaceMap.delete(selectedObject.id);
				renumberSpaces(selectedObject.number);
				this.selectedObject = undefined;
				this.highlightedObject = undefined;
				break;
			default:
				break;
		}
	}
}
document.addEventListener(
	'keyup',
	function (event) {
		var key = event.key.toLowerCase();
		if (key == 'delete') {
			if (selectedObject || highlightedObject)
				selectedObject = highlightedObject;
			deleteSelected();
		}
		if (key == 'a') {
			selectPoints();
		}
		if (key == '1') {
			if (selectedObject || highlightedObject) {
				drawOneWay = true;
				drawTwoWay = false;
				linkStart = highlightedObject || selectedObject;
			}
		}
		if (key == '2') {
			if (selectedObject || highlightedObject) {
				drawOneWay = false;
				drawTwoWay = true;
				linkStart = highlightedObject || selectedObject;
			}
		}
	},
	false
);

function renumberSpaces(startNum) {
	var allSpaces = Array.from(spaceMap.values());
	for (var i = 0; i < allSpaces.length; i++) {
		var curSpace = allSpaces[i];
		if (curSpace.number > startNum) curSpace.number--;
	}
}
function deleteConnection(spaceId, connectionId, bothWays) {
	var origSpace = spaceMap.get(spaceId);
	origSpace.connections = origSpace.connections.filter(
		(c) => c.id != connectionId
	);
	if (bothWays) {
		var connectedSpace = spaceMap.get(connectionId);
		connectedSpace.connections = connectedSpace.connections.filter(
			(c) => c.id != spaceId
		);
	}
}
function updateSpaceType(typeName) {
	if (selectedObject) {
		if (selectedObject.objectType == ObjectType.Space) {
			switch (typeName) {
				case 'movement':
					selectedObject.spaceType = SpaceType.BASIC;
					break;
				case 'door':
					selectedObject.spaceType = SpaceType.DOOR;
					break;
				case 'escape':
					selectedObject.spaceType = SpaceType.ESCAPE;
					break;
				case 'start':
					selectedObject.spaceType = SpaceType.STARTING;
					break;
				case 'item':
					selectedObject.spaceType = SpaceType.ITEM;
					break;
				case 'adversary':
					selectedObject.spaceType = SpaceType.ADVERSARY;
					break;
				case 'objective':
					selectedObject.spaceType = SpaceType.OBJECTIVE;
					break;
				case 'interaction':
					selectedObject.spaceType = SpaceType.INTERACTION;
					break;
				case 'involved':
					selectedObject.spaceType = SpaceType.INVOLVED;
					break;
				default:
					break;
			}
		}
	}
}
function selectPoints() {
	selectingPointA = true;
	canvas.style.cursor = 'none';
	this.resetPaths();
}

// Drawing
function redraw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSpaces();

	if (selectingPointA) {
		drawText(mousePos.x, mousePos.y, 'A', 'bold 10pt Arial');
	}
	if (selectingPointB) {
		drawText(mousePos.x, mousePos.y, 'B', 'bold 10pt Arial');
	}

	setTimeout(redraw, 30);
}
function drawSpaces() {
	ctx.moveTo(0, 0);
	var arr = Array.from(spaceMap.values());
	for (var i = 0; i < arr.length; i++) {
		ctx.save();
		var space = arr[i];
		ctx.lineWidth = space.drawOptions.width;
		ctx.strokeStyle = space.drawOptions.color;

		if (pointA && pointA.id == space.id) {
			ctx.lineWidth = 3;
			ctx.strokeStyle = '#00BA4D';
		}
		if (pointB && pointB.id == space.id) {
			ctx.lineWidth = 3;
			ctx.strokeStyle = '#1600BA';
		}

		if (space.spaceType.image)
			drawImage(
				space.center.x - space.radius,
				space.center.y - space.radius,
				imageMap.get(space.spaceType.image)
			);
		drawCircle(space.center.x, space.center.y, circleRadius);
		drawText(
			space.center.x,
			space.center.y + 5,
			space.number,
			'bold 10pt Arial',
			space.spaceType.fontColor
		);

		ctx.lineWidth = 1;
		ctx.strokeStyle = '#000000';
		for (let c = 0; c < space.connections.length; c++) {
			var conSpace = space.connections[c];
			var dX = conSpace.center.x - space.center.x;
			var dY = conSpace.center.y - space.center.y;
			var angle = Math.atan2(dY, dX);
			var startX = space.center.x + space.radius * Math.cos(angle);
			var startY = space.center.y + space.radius * Math.sin(angle);
			var endX =
				conSpace.center.x + space.radius * Math.cos(Math.PI + angle);
			var endY =
				conSpace.center.y + space.radius * Math.sin(Math.PI + angle);

			drawArrow(startX, startY, endX, endY);
		}
		ctx.restore();

		if (showAllPaths) {
			ctx.save();
			var distance = visitedMap.get(space.id);
			drawFilledCircle(space.center.x, space.center.y - 24, 8, '#B3B3B3');
			drawText(
				space.center.x,
				space.center.y - 20,
				distance,
				'bold 7pt Arial'
			);
			ctx.restore();
		}
	}

	if (drawOneWay || drawTwoWay) {
		var dX = linkStart.center.x - mousePos.x;
		var dY = linkStart.center.y - mousePos.y;
		var angle = Math.atan2(dY, dX);
		var startX =
			linkStart.center.x + linkStart.radius * Math.cos(Math.PI + angle);
		var startY =
			linkStart.center.y + linkStart.radius * Math.sin(Math.PI + angle);
		drawArrow(startX, startY, mousePos.x, mousePos.y);
		if (drawTwoWay) drawArrow(mousePos.x, mousePos.y, startX, startY);
	}
}
function drawCircle(x, y, radius) {
	ctx.save();
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}
function drawFilledCircle(x, y, radius, color) {
	ctx.save();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.lineWidth = 0;
	ctx.fillStyle = color;
	ctx.fill();
	ctx.restore();
}
function drawText(x, y, text, font = '10Pt Arial', fontColor = '#000000') {
	ctx.save();
	ctx.fillStyle = fontColor;
	ctx.font = font;
	ctx.textAlign = 'center';
	ctx.fillText(text, x, y);
	ctx.restore();
}
function drawArrow(startX, startY, endX, endY) {
	var arrowLength = 5;
	var dX = endX - startX;
	var dY = endY - startY;
	var angle = Math.atan2(dY, dX);
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	/*
	ctx.lineTo(
		endX - arrowLength * Math.cos(angle - Math.PI / 6),
		endY - arrowLength * Math.sin(angle - Math.PI / 6)
	);
	ctx.moveTo(endX, endY);
	ctx.lineTo(
		endX - arrowLength * Math.cos(angle + Math.PI / 6),
		endY - arrowLength * Math.sin(angle + Math.PI / 6)
	);*/
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}
function drawImage(x, y, image) {
	ctx.save();
	ctx.drawImage(image, x, y, 40, 40);
	ctx.restore();
}
function setupSpaces(existingSpaces = undefined) {
	allObjects = [];
	spaceMap.clear();
	if (!existingSpaces) {
		let curSpace = 1;
		for (let i = 0; i < ROWS; i++) {
			for (let j = 0; j < COLS; j++) {
				let space;
				if (i % 2 === 0)
					space = new Space(
						curSpace - 1,
						j * circleRadius + j * padding + 40,
						i * circleRadius + i * padding + 40,
						SpaceType.BASIC,
						LightLevel.DIM,
						curSpace,
						i + 1,
						j + 1
					);
				else
					space = new Space(
						curSpace - 1,
						j * circleRadius + j * padding + 70,
						i * circleRadius + i * padding + 40,
						SpaceType.BASIC,
						LightLevel.DIM,
						curSpace,
						i + 1,
						j + 1
					);
				allObjects.push(space);
				curSpace++;
				spaceMap.set(space.id, space);
			}
		}
		setupConnections();
	} else {
		for (let loadedSpace of existingSpaces) {
			const { id, row, col, type, lightLevel, number } = loadedSpace;
			let i = row - 1,
				j = col - 1;
			let space;
			if (i % 2 === 0)
				space = new Space(
					id,
					j * circleRadius + j * padding + 40,
					i * circleRadius + i * padding + 40,
					type,
					lightLevel,
					number,
					row,
					col
				);
			else
				space = new Space(
					id,
					j * circleRadius + j * padding + 70,
					i * circleRadius + i * padding + 40,
					type,
					lightLevel,
					number,
					row,
					col
				);
			allObjects.push(space);
			spaceMap.set(space.id, space);
		}
		setupConnections(existingSpaces);
		console.log('Loaded spaces: ', spaceMap, JSON.stringify(spaceMap));
	}
}
function setupConnections(existingSpaces = undefined) {
	if (!existingSpaces) {
		for (var i = 0; i < spaceMap.size; i++) {
			var space = spaceMap.get(i);
			var topLeftMod = -COLS;
			var topRightMod = -COLS + 1;
			var bottomLeftMod = COLS;
			var bottomRightMod = COLS + 1;

			let offset = space.row % 2 == 1 ? 1 : 0;
			// Check above left and right if row not at top
			if (space.row != 1) {
				if (space.row % 2 == 0 || space.col != 1)
					space.connections.push(
						spaceMap.get(i + topLeftMod - offset)
					);
				if (space.row % 2 == 1 || space.col != COLS)
					space.connections.push(
						spaceMap.get(i + topRightMod - offset)
					);
			}

			// Check bottom left and right, if row not at bottom
			if (space.row != ROWS) {
				if (space.row % 2 == 0 || space.col != 1)
					space.connections.push(
						spaceMap.get(i + bottomLeftMod - offset)
					);
				if (space.row % 2 == 1 || space.col != COLS)
					space.connections.push(
						spaceMap.get(i + bottomRightMod - offset)
					);
			}

			// Check left
			if (space.col != 1) {
				space.connections.push(spaceMap.get(i - 1));
			}

			// Check right
			if (space.col != COLS) {
				space.connections.push(spaceMap.get(i + 1));
			}
		}
	} else {
		console.log('Load connections: ', spaceMap);
		for (let loadedSpace of existingSpaces) {
			let space = spaceMap.get(loadedSpace.id);
			let connections = [];
			for (let connectionId of loadedSpace.connections)
				connections.push(spaceMap.get(connectionId));
			space.connections = connections;
			//spaceMap.set(space.id, space);
		}
	}
}
function addConnection(spaceA, spaceB, twoWay = false) {
	spaceA.connections.push(spaceB);
	console.log(
		'Space ' +
			spaceA.number +
			' added connection to ' +
			spaceB.number +
			' | twoWay? ' +
			twoWay
	);
	if (twoWay) spaceB.connections.push(spaceA);
}
function setupImages() {
	var movementImage = new Image(42, 42);
	movementImage.src = 'public/images/movement-space.png';
	imageMap.set('movement-space', itemImage);

	var itemImage = new Image(42, 42);
	itemImage.src = 'public/images/item-space.png';
	imageMap.set('item-space', itemImage);

	var objectiveImage = new Image(42, 42);
	objectiveImage.src = 'public/images/objective-space.png';
	imageMap.set('objective-space', objectiveImage);

	var interactionImage = new Image(42, 42);
	interactionImage.src = 'public/images/interaction-space.png';
	imageMap.set('interaction-space', interactionImage);

	var involvedImage = new Image(42, 42);
	involvedImage.src = 'public/images/involved-space.png';
	imageMap.set('involved-space', involvedImage);

	var adversaryImage = new Image(42, 42);
	adversaryImage.src = 'public/images/adversary-space.png';
	imageMap.set('adversary-space', adversaryImage);

	var startImage = new Image(42, 42);
	startImage.src = 'public/images/start-space.png';
	imageMap.set('start-space', startImage);

	var escapeImage = new Image(42, 42);
	escapeImage.src = 'public/images/escape-space.png';
	imageMap.set('escape-space', escapeImage);

	var doorImage = new Image(42, 42);
	doorImage.src = 'public/images/door-space.png';
	imageMap.set('door-space', doorImage);
}

// Analytics
function shortestPath(startSpace, endSpace) {
	visitedMap.clear();
	var path = [];
	var visitList = [{ space: startSpace, path: path.slice() }];

	while (visitList.length > 0) {
		var visitData = visitList.shift();
		var curSpace = visitData.space;
		path = visitData.path;
		if (!visitedMap.has(curSpace.id)) {
			path.push(curSpace);
			visitedMap.set(curSpace.id, path.slice());
			if (curSpace.id == endSpace.id) break;
			for (var j = 0; j < curSpace.connections.length; j++) {
				var conSpace = curSpace.connections[j];
				if (!visitedMap.has(conSpace.id))
					visitList.push({ space: conSpace, path: path.slice() });
			}
		}
	}

	path = visitedMap.get(endSpace.id);
	curShortestPath = path;
	var pathString = '';
	for (var i = 0; i < path.length; i++) {
		var curSpace = path[i];
		curSpace.setCustomDrawOptions('#009094', 3);
		pathString += curSpace.number;
		if (i != path.length - 1) pathString += ' > ';
	}
	return { pathString: pathString, length: path.length - 1 };
}
function resetPaths() {
	pointA = undefined;
	pointB = undefined;
	document.getElementById('pointA').innerHTML = '';
	document.getElementById('pointB').innerHTML = '';
	showAllPaths = false;
	for (var i = 0; i < curShortestPath.length; i++) {
		var curSpace = curShortestPath[i];
		curSpace.resetDrawOptions();
	}
}
function calculateAllPaths() {
	if (selectedObject) {
		visitedMap.clear();
		var visitList = [{ space: selectedObject, distance: 0 }];

		while (visitList.length > 0) {
			var visitData = visitList.shift();
			var curSpace = visitData.space;
			var curDistance = visitData.distance;
			if (!visitedMap.has(curSpace.id)) {
				visitedMap.set(curSpace.id, curDistance);
				for (var j = 0; j < curSpace.connections.length; j++) {
					var conSpace = curSpace.connections[j];
					if (!visitedMap.has(conSpace.id))
						visitList.push({
							space: conSpace,
							distance: curDistance + 1,
						});
				}
			}
		}

		showAllPaths = true;
	}
}
function updateMousePos(event) {
	var rect = canvas.getBoundingClientRect();
	(mousePos.x = event.clientX - rect.left),
		(mousePos.y = event.clientY - rect.top);
}

// TODO: Update this later
const MAP_ID = 'SyF2h6sxq';
async function saveMap() {
	let saveData = [];
	for (let space of Array.from(spaceMap.values())) {
		saveData.push({
			id: space.id,
			number: space.number,
			type: space.spaceType.enumVal,
			lightLevel: space.lightLevel.enumVal,
			row: space.row,
			col: space.col,
			connections: space.connections.map((conn) => {
				return conn.id;
			}),
		});
	}
	const map = await updateMap(MAP_ID, saveData);
}
async function loadMap(id) {
	const loadedMapData = await loadMapFromDb(MAP_ID);
	document.getElementById('map-title').innerHTML = loadedMapData.title;
	setupSpaces(loadedMapData.spaces);
}

setupImages();
setupSpaces();
redraw();
