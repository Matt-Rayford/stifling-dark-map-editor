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

export enum SpaceType {
	BASIC = 'BASIC',
	ADVERSARY = 'ADVERSARY',
	STARTING = 'STARTING',
	INTERACTION = 'INTERACTION',
	INVOLVED = 'INVOLVED',
	DOOR = 'DOOR',
}

export interface Space {
	id: number;
	number: number;
	type: SpaceType;
	lightLevel: LightLevel;
	group: number;
	row: number;
	col: number;
	connections: number[];
	isDeleted: boolean;
}
