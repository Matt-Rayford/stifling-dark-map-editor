import { pool } from '..';
import { SpaceGroup } from '../types/space-group';

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
