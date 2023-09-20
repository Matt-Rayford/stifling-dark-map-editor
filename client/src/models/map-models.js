import { DRAW_CONSTANTS, MAP_CONSTANTS } from '../utils/constants';

export const ObjectType = {
	Space: 'space',
};
export const SpaceTypes = {
	BASIC: {
		name: 'Basic Movement Space',
		fontColor: DRAW_CONSTANTS.SPACE_COLOR,
		enumVal: 'BASIC',
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
		fontColor: '#FFFFFF',
		enumVal: 'STARTING',
	},
	INTERACTION: {
		name: 'Interaction',
		image: 'interaction-space',
		fontColor: '#FFFFFF',
		enumVal: 'INTERACTION',
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
		fontColor: '#FFFFFF',
		enumVal: 'DOOR',
	},
};
export const LightLevels = {
	BRIGHT: { name: 'Bright Space', movementCost: 1, enumVal: 'BRIGHT' },
	DIM: { name: 'Dim Space', movementCost: 1, enumVal: 'DIM' },
	PITCH_BLACK: {
		name: 'Pitch Black Space',
		movementCost: 2,
		enumVal: 'PITCH_BLACK',
	},
};

export class Connection {
	constructor(startX, startY, endX, endY) {
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
	}
}

export class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

export class DrawOptions {
	constructor(color) {
		this.color = color;
		this.width = 2;
	}
}

export class Space {
	baseWidth = 1;

	constructor(
		id,
		x,
		y,
		type,
		lightLevel,
		number,
		row,
		col,
		mapDrawOptions,
		radius = MAP_CONSTANTS.SPACE_RADIUS,
		isDeleted = false,
		group = null
	) {
		this.id = id;
		this.center = new Point(x, y);
		this.spaceType = type.name ? type : SpaceTypes[type];
		this.lightLevel = lightLevel.name
			? lightLevel
			: LightLevels[lightLevel];
		this.number = number;
		this.radius = radius;
		this.objectType = ObjectType.Space;
		this.drawOptions = new DrawOptions(mapDrawOptions.spaceColor);
		this.connections = [];
		this.row = row;
		this.col = col;
		this.baseColor = mapDrawOptions.spaceColor;
		this.selected = false;
		this.highlighted = false;
		this.isDeleted = isDeleted;
		this.group = group;
	}

	updateColor(color) {
		this.drawOptions.color = color;
		this.baseColor = color;
	}

	updateLightLevel(value) {
		this.lightLevel = LightLevels[value];
	}

	updateType(value) {
		this.spaceType = SpaceTypes[value];
	}

	updateGroup(value) {
		this.group = parseInt(value);
	}
	removeGroup() {
		this.group = null;
	}

	highlight(highlightedObject) {
		this.drawOptions.color = '#E81C0E';
		this.drawOptions.width = 3;
		this.highlighted = true;
		highlightedObject = this;
	}
	unHighlight() {
		if (!this.selected) {
			this.drawOptions.color = this.baseColor;
			this.drawOptions.width = this.baseWidth;
			this.highlighted = false;
		} else this.select();
	}
	select() {
		this.drawOptions.color = '#D66860';
		this.drawOptions.width = 3;
		this.selected = true;
	}
	deselect() {
		this.drawOptions.color = this.baseColor;
		this.drawOptions.width = this.baseWidth;
		this.selected = false;
	}

	setCustomDrawOptions(color, width) {
		this.drawOptions.color = color;
		this.drawOptions.width = width;
		this.baseColor = color;
		this.baseWidth = width;
	}
	resetDrawOptions() {
		//this.drawOptions.color = DRAW_CONSTANTS.SPACE_COLOR;
		this.drawOptions.width = 1;
		//this.baseColor = DRAW_CONSTANTS.SPACE_COLOR;
		this.baseWidth = 1;
	}

	updateDrawOptions(settings) {
		this.radius = settings.spaceRadius;
		this.center.x =
			settings.paddingX +
			(this.col - 1) * settings.horizontalSpacing +
			((this.row - 1) % 2 === 0 ? 0 : settings.indent);
		this.center.y =
			settings.paddingY + (this.row - 1) * settings.verticalSpacing;
	}

	updateNumber(newNum) {
		this.number = newNum;
	}

	delete() {
		this.isDeleted = true;
		this.connections = [];
		this.selected = false;
		this.highlighted = false;
	}
}
