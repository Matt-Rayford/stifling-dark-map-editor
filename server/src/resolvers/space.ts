import { pool } from '..';
import { DBSpace, SpaceInput } from '../types/space';
import { cachedSpaceGroups, initSpaceGroupsCache } from '../utils/cache';
import { getLightLevelById } from './light-level';
import { getSpaceGroupById } from './space-group';
import { getSpaceTypeById } from './space-type';

export const getSpace = (spaceId: string): Promise<DBSpace> => {
	const query = 'SELECT * FROM sd_map_space WHERE id=$1';

	return pool
		.query({
			text: query,
			values: [spaceId],
		})
		.then((r) => {
			return r.rows?.[0] as DBSpace;
		})
		.catch((e) => {
			console.error(`ERROR - getSpace(${spaceId}): `, e);
			throw new Error('Error getting map space');
		});
};

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

export const updateSpace = async (space: SpaceInput) => {
	let variableNum = 1;
	const variables = [];
	const queryUpdates: string[] = [];

	if (space.connections) {
		queryUpdates.push(`connections = $${variableNum}`);
		variables.push(
			space.connections.length ? `{${space.connections.join(',')}}` : '{}'
		);
		variableNum += 1;
	}
	if (space.groupId !== undefined) {
		queryUpdates.push(`zone_id = $${variableNum}`);
		variables.push(space.groupId);
		variableNum += 1;
	}
	if (typeof space.isDeleted === 'boolean') {
		queryUpdates.push(`is_deleted = $${variableNum}`);
		variables.push(space.isDeleted);
		variableNum += 1;
	}
	if (space.lightLevelId) {
		queryUpdates.push(` light_level_id = $${variableNum}`);
		variables.push(space.lightLevelId);
		variableNum += 1;
	}
	if (space.typeId) {
		queryUpdates.push(` type_id = $${variableNum}`);
		variables.push(space.typeId);
		variableNum += 1;
	}

	if (queryUpdates.length) {
		const query = `UPDATE sd_map_space SET ${queryUpdates.join(
			', '
		)} WHERE id=$${variableNum} RETURNING *`;
		variables.push(space.id);

		return pool
			.query({
				text: query,
				values: variables,
			})
			.then((r) => {
				return r.rows?.[0];
			})
			.catch((e) => {
				console.error(`ERROR - updateSpace(${space.id}): `, e);
				throw new Error('Error updating space');
			});
	}

	return getSpace(space.id);
};

export const Space = {
	col: (space: DBSpace) => space.col_num,
	group: async (space: DBSpace) => {
		if (!cachedSpaceGroups.has(space.map_id)) {
			await initSpaceGroupsCache();
		}
		return (
			cachedSpaceGroups.get(space.map_id).find((g) => g.id === space.zone_id) ??
			null
		);
	},
	isDeleted: (space: DBSpace) => space.is_deleted,
	lightLevel: (space: DBSpace) => getLightLevelById(space.light_level_id),
	number: (space: DBSpace) => space.space_number,
	displayNumber: (space: DBSpace) => space.display_number,
	row: (space: DBSpace) => space.row_num,
	type: (space: DBSpace) => getSpaceTypeById(space.type_id),
};
