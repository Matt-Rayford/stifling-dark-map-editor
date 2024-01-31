import { LightLevel } from './light-level';

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
	id: string;
	number: number;
	type: SpaceType;
	lightLevel: LightLevel;
	group: number;
	row: number;
	col: number;
	connections: number[];
	isDeleted: boolean;
}

export interface DBSpace {
	id: string;
	map_id: string;
	space_number: number;
	display_number: number;
	light_level_id: string;
	type_id: string;
	row_num: number;
	col_num: number;
	connections: number[];
	is_deleted: boolean;
	zone_id: string;
}
