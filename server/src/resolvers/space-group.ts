import { pool } from '..';
import { DBSpaceGroup, SpaceGroup } from '../types/space-group';

export const getMapSpaceGroups = async (
	mapId: string
): Promise<SpaceGroup[]> => {
	const query = 'SELECT * FROM sd_map_space_group WHERE map_id=$1';

	return pool
		.query({
			text: query,
			values: [mapId],
		})
		.then((r) => {
			return r.rows;
		})
		.catch((e) => {
			console.error(`ERROR: getMapSpaceGroups(${mapId}): `, e);
			throw new Error(`Error getting space groups`);
		});
};

export const getSpaceGroupById = async (id: string): Promise<DBSpaceGroup> => {
	const query = 'SELECT * FROM sd_map_space_group WHERE id=$1';

	return pool
		.query({
			text: query,
			values: [id],
		})
		.then((r) => {
			return r.rows?.[0];
		})
		.catch((e) => {
			console.error(`ERROR: getSpaceGroupById(${id}): `, e);
			throw new Error(`Error getting space group`);
		});
};
