import { LightLevel } from './light-level';
import { MapSettings } from './map-settings';
import { SpaceType } from './space';

export interface SDSpace {
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

export interface SDMap {
	id: string;
	title: string;
	settings: MapSettings;
	spaces: SDSpace[];
	spaceGroups: SpaceGroup[];
}
