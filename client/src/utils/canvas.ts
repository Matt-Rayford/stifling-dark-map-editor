import { NewConnection } from '../models/connection';
import { LightLevel } from '../models/light-level';
import { SDSpace } from '../models/map';
import { MapSettings } from '../models/map-settings';
import { MousePos } from '../models/mouse-pos';
import { Space, SpaceType, getSpaceTypeDetails } from '../models/space';
import { MAP_CONSTANTS } from './constants';

export const setupSpaces = (
	existingSpaces: SDSpace[] = [],
	mapSettings: MapSettings
) => {
	const objects: Space[] = [];
	const { ROWS, COLS, SPACER_X, SPACER_Y, INDENT, PADDING_X, PADDING_Y } =
		MAP_CONSTANTS;
	const spaceMap = new Map<number, Space>();
	if (!existingSpaces) {
		let curSpace = 1;
		for (let i = 0; i < ROWS; i++) {
			for (let j = 0; j < COLS; j++) {
				const space = new Space(
					curSpace - 1,
					PADDING_X + j * SPACER_X + (i % 2 === 0 ? 0 : INDENT),
					PADDING_Y + i * SPACER_Y,
					SpaceType.BASIC,
					LightLevel.DIM,
					curSpace,
					i + 1,
					j + 1,
					mapSettings
				);
				objects.push(space);
				curSpace++;
				spaceMap.set(space.id, space);
			}
		}
		setupConnections(spaceMap);
	} else {
		const connectionMap = new Map<number, number[]>();
		for (let loadedSpace of existingSpaces) {
			const { id, row, col, type, lightLevel, number, isDeleted, group } =
				loadedSpace;
			let i = row - 1,
				j = col - 1;
			const space = new Space(
				id,
				mapSettings.paddingX +
					j * mapSettings.horizontalSpacing +
					(i % 2 === 0 ? 0 : mapSettings.indent),
				mapSettings.paddingY + i * mapSettings.verticalSpacing,
				type,
				lightLevel,
				number,
				row,
				col,
				mapSettings,
				mapSettings.spaceRadius,
				isDeleted,
				group
			);

			objects.push(space);
			spaceMap.set(space.id, space);
			connectionMap.set(loadedSpace.id, loadedSpace.connections);
		}
		setupConnections(spaceMap, objects, connectionMap);
	}
	return { spaceMap, objects };
};

export const calculateAllPaths = (fromSpace: Space) => {
	if (fromSpace) {
		const visitedMap = new Map<number, number>();
		const visitList = [{ space: fromSpace, distance: 0 }];

		while (visitList.length > 0) {
			var visitData = visitList?.shift();
			var curSpace = visitData?.space;
			var curDistance = visitData?.distance;
			if (curSpace && curDistance) {
				if (!visitedMap.has(curSpace.id)) {
					visitedMap.set(curSpace.id, curDistance);
					for (var j = 0; j < curSpace.connections.length; j++) {
						var conSpace = curSpace.connections[j];
						if (!visitedMap.has(conSpace.id))
							visitList.push({
								space: conSpace,
								distance:
									curDistance +
									(conSpace.lightLevel ===
									LightLevel.PITCH_BLACK
										? 2
										: 1),
							});
					}
				}
			}
		}

		return visitedMap;
	}
};

export const updateSpaceColor = (
	spaceMap: Map<number, Space>,
	color: string
) => {
	for (let space of spaceMap.values()) {
		space.updateColor(color);
	}
};

const setupConnections = (
	spaceMap: Map<number, Space>,
	existingSpaces: Space[] = [],
	connectionMap?: Map<number, number[]>
) => {
	const { ROWS, COLS } = MAP_CONSTANTS;
	if (!existingSpaces) {
		for (let space of spaceMap.values()) {
			var topLeftMod = -COLS;
			var topRightMod = -COLS + 1;
			var bottomLeftMod = COLS;
			var bottomRightMod = COLS + 1;

			let offset = space.row % 2 == 1 ? 1 : 0;
			// Check above left and right if row not at top
			if (space.row != 1) {
				if (space.row % 2 == 0 || space.col != 1)
					space.connections.push(
						spaceMap.get(space.id + topLeftMod - offset)!
					);
				if (space.row % 2 == 1 || space.col != COLS)
					space.connections.push(
						spaceMap.get(space.id + topRightMod - offset)!
					);
			}

			// Check bottom left and right, if row not at bottom
			if (space.row != ROWS) {
				if (space.row % 2 == 0 || space.col != 1)
					space.connections.push(
						spaceMap.get(space.id + bottomLeftMod - offset)!
					);
				if (space.row % 2 == 1 || space.col != COLS)
					space.connections.push(
						spaceMap.get(space.id + bottomRightMod - offset)!
					);
			}

			// Check left
			if (space.col != 1) {
				space.connections.push(spaceMap.get(space.id - 1)!);
			}

			// Check right
			if (space.col != COLS) {
				space.connections.push(spaceMap.get(space.id + 1)!);
			}
		}
	} else {
		for (const loadedSpace of existingSpaces) {
			const space = spaceMap.get(loadedSpace.id)!;
			const connectionIds = connectionMap!.get(space.id)!;
			for (const spaceId of connectionIds) {
				space.connections.push(spaceMap.get(spaceId)!);
			}
		}
	}
};

export const clearCanvas = (
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D
) => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const redrawMap = (
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	backgroundImage: CanvasImageSource
) => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawImage(ctx, 0, 0, canvas.width, canvas.height, backgroundImage);
};

export const redraw = (
	canvas: HTMLCanvasElement,
	ctx: CanvasRenderingContext2D,
	spaceMap: Map<number, Space>,
	baseColor: string,
	mousePos: MousePos,
	newConnection?: NewConnection,
	distanceMap?: Map<number, number>,
	settings?: any
) => {
	const spaceGroupMap = settings?.get('spaceGroups');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSpaces(ctx, spaceMap, distanceMap, spaceGroupMap);

	/*
	if (selectingPointA) {
		drawText(mousePos.x, mousePos.y, 'A', 'bold 10pt Arial');
	}
	if (selectingPointB) {
		drawText(mousePos.x, mousePos.y, 'B', 'bold 10pt Arial');
	}
	*/
	if (newConnection) {
		drawNewConnection(
			ctx,
			baseColor,
			newConnection.fromSpace,
			mousePos,
			newConnection.isTwoWay
		);
	}
};

export const drawSpaces = (
	ctx: CanvasRenderingContext2D,
	spaceMap: Map<number, Space>,
	distanceMap?: Map<number, number>,
	spaceGroupMap?: Map<number, SpaceGroup>
) => {
	let highlightedSpaces = [];
	ctx.moveTo(0, 0);
	for (let space of spaceMap.values()) {
		if (space.highlighted || space.selected) {
			highlightedSpaces.push(space);
		} else if (!space.isDeleted) {
			ctx.save();
			ctx.lineWidth = space.drawOptions.width;
			ctx.strokeStyle = space.drawOptions.color;
			let pattern: number[] = [];
			if (space.lightLevel === LightLevel.PITCH_BLACK) {
				pattern = [5, 5];
			}
			ctx.setLineDash(pattern);

			/*if (pointA && pointA.id === space.id) {
			ctx.lineWidth = 3;
			ctx.strokeStyle = '#00BA4D';
			}
			if (pointB && pointB.id == space.id) {
				ctx.lineWidth = 3;
				ctx.strokeStyle = '#1600BA';
			}*/

			/*
			if (space.type.image) {
				drawImage(
				ctx,
				space.center.x - space.radius,
				space.center.y - space.radius,
				imageMap.get(space.spaceType.image)
			);
			}
			*/

			drawCircle(ctx, space.center.x, space.center.y, space.radius);

			let spaceText = `${space.number}`;
			if (typeof space.group === 'number' && spaceGroupMap) {
				const spaceGroup = spaceGroupMap.get(space.group);
				if (spaceGroup) {
					spaceText = `${spaceGroup.prefix}-${space.number}`;
				}
			}
			drawText(
				ctx,
				space.center.x,
				space.center.y + 5,
				spaceText,
				'bold 10pt Arial',
				getSpaceTypeDetails(space.type).fontColor
			);

			ctx.lineWidth = 1;
			ctx.strokeStyle = space.drawOptions.color;
			ctx.setLineDash([]);
			for (let connection of space.connections) {
				var dX = connection.center.x - space.center.x;
				var dY = connection.center.y - space.center.y;
				var angle = Math.atan2(dY, dX);
				var startX = space.center.x + space.radius * Math.cos(angle);
				var startY = space.center.y + space.radius * Math.sin(angle);
				var endX =
					connection.center.x +
					space.radius * Math.cos(Math.PI + angle);
				var endY =
					connection.center.y +
					space.radius * Math.sin(Math.PI + angle);

				drawLine(
					ctx,
					space.drawOptions.color,
					startX,
					startY,
					endX,
					endY,
					!connection.connections.some(
						(otherSpace) => otherSpace.id === space.id
					)
				);
			}
			ctx.restore();

			if (distanceMap) {
				ctx.save();
				var distance = distanceMap.get(space.id);
				drawFilledCircle(
					ctx,
					space.center.x,
					space.center.y - space.radius,
					8,
					'#B3B3B3'
				);
				drawText(
					ctx,
					space.center.x,
					space.center.y - space.radius + 4,
					`${distance}`,
					'bold 7pt Arial'
				);
				ctx.restore();
			}
		}
	}
	for (let space of highlightedSpaces) {
		ctx.save();
		ctx.lineWidth = space.drawOptions.width;
		ctx.strokeStyle = space.drawOptions.color;
		drawCircle(ctx, space.center.x, space.center.y, space.radius);
		ctx.strokeStyle = space.drawOptions.color;
		for (let connection of space.connections) {
			var dX = connection.center.x - space.center.x;
			var dY = connection.center.y - space.center.y;
			var angle = Math.atan2(dY, dX);
			var startX = space.center.x + space.radius * Math.cos(angle);
			var startY = space.center.y + space.radius * Math.sin(angle);
			var endX =
				connection.center.x + space.radius * Math.cos(Math.PI + angle);
			var endY =
				connection.center.y + space.radius * Math.sin(Math.PI + angle);

			drawLine(
				ctx,
				space.drawOptions.color,
				startX,
				startY,
				endX,
				endY,
				!connection.connections.some(
					(otherSpace) => otherSpace.id === space.id
				)
			);
		}
		ctx.restore();
	}
};

export const drawNewConnection = (
	ctx: CanvasRenderingContext2D,
	color: string,
	fromSpace: Space,
	mousePos: MousePos,
	isTwoWay = true
) => {
	var dX = fromSpace.center.x - mousePos.x;
	var dY = fromSpace.center.y - mousePos.y;
	var angle = Math.atan2(dY, dX);
	var startX =
		fromSpace.center.x + fromSpace.radius * Math.cos(Math.PI + angle);
	var startY =
		fromSpace.center.y + fromSpace.radius * Math.sin(Math.PI + angle);
	drawLine(ctx, color, startX, startY, mousePos.x, mousePos.y);
	if (isTwoWay) drawLine(ctx, color, mousePos.x, mousePos.y, startX, startY);
};

const drawCircle = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	radius: number
) => {
	ctx.save();
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
};

const drawFilledCircle = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	radius: number,
	color: string
) => {
	ctx.save();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.lineWidth = 0;
	ctx.fillStyle = color;
	ctx.fill();
	ctx.restore();
};

const drawText = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	text: string,
	font = '10Pt Arial',
	fontColor = '#000000'
) => {
	ctx.save();
	ctx.fillStyle = fontColor;
	ctx.font = font;
	ctx.textAlign = 'center';
	ctx.fillText(text, x, y);
	ctx.restore();
};

const drawLine = (
	ctx: CanvasRenderingContext2D,
	color: string,
	startX: number,
	startY: number,
	endX: number,
	endY: number,
	drawArrow = false
) => {
	var arrowLength = 5;
	var dX = endX - startX;
	var dY = endY - startY;
	var angle = Math.atan2(dY, dX);
	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = color;
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	if (drawArrow) {
		ctx.lineTo(
			endX - arrowLength * Math.cos(angle - Math.PI / 6),
			endY - arrowLength * Math.sin(angle - Math.PI / 6)
		);

		ctx.moveTo(endX, endY);
		ctx.lineTo(
			endX - arrowLength * Math.cos(angle + Math.PI / 6),
			endY - arrowLength * Math.sin(angle + Math.PI / 6)
		);
	}
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
};

const drawImage = (
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	image: CanvasImageSource
) => {
	ctx.save();
	ctx.drawImage(image, x, y, width, height);
	ctx.restore();
};

export const getMousePos = (
	event: any,
	canvas: HTMLCanvasElement
): MousePos => {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top,
	};
};

export const setupSettings = (spaceGroups: SpaceGroup[]) => {
	const settings = new Map();

	const spaceGroupMap = new Map<number, SpaceGroup>();
	for (let group of spaceGroups) {
		spaceGroupMap.set(group.id, group);
	}
	settings.set('spaceGroups', spaceGroupMap);
	return settings;
};

export const renumberSpaces = (spaceMap: Map<number, Space>, settings: any) => {
	const spaceGroupMap = settings.get('spaceGroups');
	const renumberMap = new Map();
	renumberMap.set('-', 1);
	for (let group of spaceGroupMap.values()) {
		renumberMap.set(group.id, 1);
	}
	for (let space of spaceMap.values()) {
		if (!space.isDeleted) {
			let renumberKey =
				typeof space.group === 'number' ? space.group : '-';
			const nextNum = renumberMap.get(renumberKey);
			renumberMap.set(renumberKey, nextNum + 1);
			space.updateNumber(nextNum);
		} else {
			space.updateNumber(0);
		}
	}
};
