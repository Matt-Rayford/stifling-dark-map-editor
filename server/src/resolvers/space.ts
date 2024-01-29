import { pool } from '..';
import { DBSpace } from '../types/space';
import { getLightLevelById } from './light-level';

export const getMapSpaces = async (mapId: string): Promise<DBSpace[]> => {
	const query = 'SELECT * FROM sd_map_space WHERE map_id=$1';

	return pool
		.query({
			text: query,
			values: [mapId],
		})
		.then((r) => {
			return r.rows as DBSpace[];
		})
		.catch((e) => {
			throw new Error(`Cannot upload image for your map as it cannot be found`);
		});
};

export const Space = {
	id: (space: DBSpace) => `${space.id}`,
	number: (space: DBSpace) => space.space_number,
	lightLevel: (space: DBSpace) => getLightLevelById(space.light_level_id),
};
