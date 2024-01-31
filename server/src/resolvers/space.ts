import { pool } from '..';
import { DBSpace } from '../types/space';
import { getLightLevelById } from './light-level';
import { getSpaceTypeById } from './space-type';

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
			console.error(`ERROR - getMapSpaces(${mapId}): `, e);
			throw new Error('Error getting map spaces');
		});
};

export const deleteSpace = async (spaceId: string): Promise<boolean> => {
	const query = 'DELETE FROM sd_map_space WHERE id=$1';

	return pool
		.query({
			text: query,
			values: [spaceId],
		})
		.then(() => {
			return true;
		})
		.catch((e) => {
			console.error(`ERROR - deleteSpace(${spaceId}): `, e);
			throw new Error('Error deleting map space');
		});
};

export const Space = {
	col: (space: DBSpace) => space.col_num,
	group: (space: DBSpace) => space.zone_id,
	isDeleted: (space: DBSpace) => space.is_deleted,
	lightLevel: (space: DBSpace) => getLightLevelById(space.light_level_id),
	number: (space: DBSpace) => space.space_number,
	row: (space: DBSpace) => space.row_num,
	type: (space: DBSpace) => getSpaceTypeById(space.type_id),
};
