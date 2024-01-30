import { DRAW_CONSTANTS, MAP_CONSTANTS } from '../utils/constants';
import { DrawOptions } from './draw-options';
import { LightLevel } from './light-level';
import { MapSettings } from './map-settings';
import { Point } from './map-models';
import { ObjectType } from './object';

export interface SpaceTypeDetails {
	name: string;
	fontColor: string;
	image?: string;
}

export interface SpaceType {
	id: string;
	color: string;
	description: string;
	iconUrl?: string;
	name: string;
}

export class Space {
	id: number;
	center: Point;
	type: SpaceType;
	baseWidth = 1;
	lightLevel: LightLevel;
	number: number;
	radius: number;
	row: number;
	col: number;
	objectType: ObjectType;
	drawOptions: DrawOptions;
	connections: Space[];
	baseColor: string;
	selected: boolean;
	highlighted: boolean;
	isDeleted: boolean;
	group?: number;

	constructor(
		id: number,
		x: number,
		y: number,
		spaceType: SpaceType,
		lightLevel: LightLevel,
		number: number,
		row: number,
		col: number,
		mapDrawOptions: MapSettings,
		radius = MAP_CONSTANTS.SPACE_RADIUS,
		isDeleted = false,
		group?: number
	) {
		this.id = id;
		this.center = new Point(x, y);
		this.type = spaceType;
		this.lightLevel = lightLevel;
		this.number = number;
		this.radius = radius;
		this.objectType = ObjectType.SPACE;
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

	updateColor(color: string) {
		this.drawOptions.color = color;
		this.baseColor = color;
	}

	updateLightLevel(lightLevel: LightLevel) {
		this.lightLevel = lightLevel;
	}

	updateType(spaceType: SpaceType) {
		this.type = spaceType;
	}

	updateGroup(groupNumber: number | string) {
		this.group =
			typeof groupNumber === 'string' ? parseInt(groupNumber) : groupNumber;
	}

	removeGroup() {
		this.group = undefined;
	}

	highlight(highlightedObject: Space) {
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

	setCustomDrawOptions(color: string, width: number) {
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

	updateDrawOptions(settings: MapSettings) {
		this.radius = settings.spaceRadius;
		this.center.x =
			settings.paddingX +
			(this.col - 1) * settings.horizontalSpacing +
			((this.row - 1) % 2 === 0 ? 0 : settings.indent);
		this.center.y =
			settings.paddingY + (this.row - 1) * settings.verticalSpacing;
	}

	updateNumber(newNum: number) {
		this.number = newNum;
	}

	delete() {
		this.isDeleted = true;
		this.connections = [];
		this.selected = false;
		this.highlighted = false;
	}
}
