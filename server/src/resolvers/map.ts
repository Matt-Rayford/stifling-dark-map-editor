import { pool } from '..';
import { DBMap } from '../types/map';
import { getMapSettings } from './map-settings';
import { getMapSpaces } from './space';

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
			console.error(`ERROR - getMap(${mapId}): `, e);
			throw new Error(`Error loading map`);
		});
};

export const getMaps = async (): Promise<DBMap[]> => {
	const query = 'SELECT * FROM sd_map';

	return pool
		.query({
			text: query,
		})
		.then((r) => {
			return r.rows;
		})
		.catch((e) => {
			console.error('ERROR - getMaps: ', e);
			throw new Error(`Error loading all maps`);
		});
};

export const Map = {
	title: (map: DBMap) => map.name,
	settings: (map: DBMap) => getMapSettings(map.id),
	spaces: async (map: DBMap) => {
		const spaces = await getMapSpaces(map.id);
		return spaces;
	},
};
