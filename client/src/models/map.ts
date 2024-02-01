import { LightLevel } from './light-level';
import { MapSettings } from './map-settings';
import { SpaceType } from './space';

export interface SDSpace {
	id: string;
	number: number;
	displayNumber: number;
	type: SpaceType;
	lightLevel: LightLevel;
	group: SpaceGroup;
	row: number;
	col: number;
	connections: number[];
	isDeleted: boolean;
}

export interface SDMap {
	id: string;
	title: string;
	settings: MapSettings;
	spaces: SDSpace[];
	spaceGroups: SpaceGroup[];
}
