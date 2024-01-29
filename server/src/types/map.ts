import { MapSettings } from './map-settings';
import { DBSpace } from './space';
import { SpaceGroup } from './space-group';

export interface SDMap {
	id: string;
	title: string;
	settings: MapSettings;
	spaces: DBSpace[] | Promise<DBSpace[]>;
	spaceGroups: SpaceGroup[] | Promise<SpaceGroup[]>;
}

export interface DBMap {
	id: string;
	name: string;
}
