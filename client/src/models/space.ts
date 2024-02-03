import { MAP_CONSTANTS } from '../utils/constants';
import { DrawOptions } from './draw-options';
import { LightLevel } from './light-level';
import { Point } from './map-models';
import { ObjectType } from './object';
import {
	SpaceType,
	SpaceGroup,
	MapSettings,
} from '../graphql/__generated__/graphql';

export interface SpaceTypeDetails {
	name: string;
	fontColor: string;
	image?: string;
}

export interface SpaceInput {
	id: string;
	isDeleted?: boolean;
	groupId?: string | null;
	lightLevelId?: string;
	typeId?: string;
	connections?: number[];
}

export class Space {
	id: string;
	center: Point;
	type: SpaceType;
	baseWidth = 1;
	lightLevel: LightLevel;
	number: number;
	displayNumber: number;
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
	group?: SpaceGroup | null;

	constructor(
		id: string,
		x: number,
		y: number,
		spaceType: SpaceType,
		lightLevel: LightLevel,
		number: number,
		displayNumber: number,
		row: number,
		col: number,
		mapDrawOptions: MapSettings,
		radius = MAP_CONSTANTS.SPACE_RADIUS,
		isDeleted = false,
		group?: SpaceGroup
	) {
		this.id = id;
		this.center = new Point(x, y);
		this.type = spaceType;
		this.lightLevel = lightLevel;
		this.number = number;
		this.displayNumber = displayNumber;
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

	updateGroup(group: SpaceGroup) {
		this.group = group;
	}

	removeGroup() {
		this.group = undefined;
	}

	highlight() {
		this.drawOptions.color = '#E81C0E';
		this.drawOptions.width = 3;
		this.highlighted = true;
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
		this.displayNumber = newNum;
	}

	delete() {
		this.isDeleted = true;
		this.connections = [];
		this.selected = false;
		this.highlighted = false;
	}
}
