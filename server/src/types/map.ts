import { LightLevel } from './light-level';
import { MapSettings } from './map-settings';
import { SpaceType } from './space';

export interface SDMap {
	id: string;
	title: string;
	settings: MapSettings;
	spaces: Space[];
	spaceGroups: SpaceGroup[];
}
