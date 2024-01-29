import { pool } from '..';
import { DBMap, SDMap } from '../types/map';
import { getMapSettings } from './map-settings';
import { getMapSpaces } from './space';
import { getMapSpaceGroups } from './space-group';

export const getMap = async (mapId: string): Promise<DBMap> => {
	const query = 'SELECT * FROM sd_map WHERE id=$1';

	return pool
		.query({
			text: query,
			values: [mapId],
		})
		.then((r) => {
			return r.rows?.[0];
		})
		.catch((e) => {
			throw new Error(`Cannot upload image for your map as it cannot be found`);
		});
};

export const Map = {
	settings: (map) => getMapSettings(map.id),
	spaces: async (map: DBMap) => {
		const spaces = await getMapSpaces(map.id);
		return spaces;
	},
};
