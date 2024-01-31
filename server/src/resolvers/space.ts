import { pool } from '..';
import { DBSpace } from '../types/space';
import { getLightLevelById } from './light-level';
import { getSpaceTypeById } from './space-type';

export const getMapSpaces = async (mapId: string): Promise<DBSpace[]> => {
	const query =
		'SELECT * FROM sd_map_space WHERE map_id=$1 ORDER BY space_number';

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

export const deleteSpace = async (
	mapId: string,
	spaceId: string
): Promise<boolean> => {
	const query = 'CALL delete_space($1, $2)';

	return pool
		.query({
			text: query,
			values: [mapId, spaceId],
		})
		.then(() => {
			renumberSpaces(mapId);
			return true;
		})
		.catch((e) => {
			console.error(`ERROR - deleteSpace(${spaceId}): `, e);
			throw new Error('Error deleting map space');
		});
};

const renumberSpaces = async (mapId: string) => {
	const query = 'CALL renumber_map_spaces($1)';

	return pool
		.query({
			text: query,
			values: [mapId],
		})
		.then(() => {
			return true;
		})
		.catch((e) => {
			console.error(`ERROR - renumberSpaces(${mapId}): `, e);
			throw new Error('Error renumbering map spaces');
		});
};

export const connectSpaces = async (space1Id: string, space2Id: string) => {
	const query = 'CALL connect_spaces($1, $2)';

	return pool
		.query({
			text: query,
			values: [space1Id, space2Id],
		})
		.then(() => {
			return true;
		})
		.catch((e) => {
			console.error(`ERROR - connectSpaces(${space1Id}, ${space2Id}): `, e);
			throw new Error('Error connecting spaces');
		});
};

export const disconnectSpaces = async (space1Id: string, space2Id: string) => {
	const query = 'CALL disconnect_spaces($1, $2)';

	return pool
		.query({
			text: query,
			values: [space1Id, space2Id],
		})
		.then(() => {
			return true;
		})
		.catch((e) => {
			console.error(`ERROR - disconnectSpaces(${space1Id}, ${space2Id}): `, e);
			throw new Error('Error disconnecting spaces');
		});
};

export const Space = {
	col: (space: DBSpace) => space.col_num,
	group: (space: DBSpace) => space.zone_id,
	isDeleted: (space: DBSpace) => space.is_deleted,
	lightLevel: (space: DBSpace) => getLightLevelById(space.light_level_id),
	number: (space: DBSpace) => space.space_number,
	displayNumber: (space: DBSpace) => space.display_number,
	row: (space: DBSpace) => space.row_num,
	type: (space: DBSpace) => getSpaceTypeById(space.type_id),
};
