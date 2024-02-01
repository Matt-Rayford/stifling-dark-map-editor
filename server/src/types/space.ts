import { LightLevel } from './light-level';
import { SpaceGroup } from './space-group';

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
	group: SpaceGroup;
	row: number;
	col: number;
	connections: number[];
	isDeleted: boolean;
}

export interface SpaceInput {
	id: string;
	isDeleted?: boolean;
	groupId?: string | null;
	lightLevelId?: string;
	typeId?: string;
	connections?: number[];
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
