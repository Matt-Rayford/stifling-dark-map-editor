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
			const data = r.rows;

			return data.map((group: SpaceGroup) => ({
				id: group.id,
				name: group.name,
				prefix: group.prefix,
			}));
		})
		.catch((e) => {
			throw new Error(`Cannot upload image for your map as it cannot be found`);
		});
};
