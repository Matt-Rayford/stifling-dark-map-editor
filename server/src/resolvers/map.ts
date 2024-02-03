import { pool } from '..';
import { DBMap } from '../types/map';
import { MapSettings } from '../types/map-settings';
import { DBSpaceGroup, SpaceGroup } from '../types/space-group';
import { cachedSpaceGroups } from '../utils/cache';
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
			console.error(`ERROR - getMap(${mapId}): `, e);
			throw new Error(`Error loading map`);
		});
};

export const getMaps = async (email: string): Promise<DBMap[]> => {
	const query = 'SELECT * FROM sd_map WHERE creator_email=$1';

	return pool
		.query({
			text: query,
			values: [email],
		})
		.then((r) => {
			return r.rows;
		})
		.catch((e) => {
			console.error('ERROR - getMaps: ', e);
			throw new Error(`Error loading all maps`);
		});
};

export const createMap = async (
	mapName: string,
	email: string
): Promise<DBMap> => {
	const query = `SELECT create_map($1, $2)`;

	return pool
		.query({
			text: query,
			values: [mapName, email],
		})
		.then((r) => {
			const mapRow = r.rows?.[0];
			if (mapRow) {
				return getMap(mapRow.create_map);
			} else {
				throw new Error(`Error creating map`);
			}
		})
		.catch((e) => {
			console.error(`ERROR - createMap(${mapName}): `, e);
			throw new Error(`Error creating map`);
		});
};

export const renameMap = async (mapId: string, mapName: string) => {
	const query = 'UPDATE sd_map SET name=$1 where id=$2 RETURNING name';
	return pool
		.query({ text: query, values: [mapName, mapId] })
		.then((r) => {
			return r.rows?.[0];
		})
		.catch((e) => {
			console.error(`ERROR - renameMap(${mapId}, ${mapName}): `, e);
			throw new Error('Error renaming map');
		});
};

export const updateMapSettings = async (
	mapId: string,
	settings: MapSettings
) => {
	getMap(mapId);

	const query =
		'UPDATE sd_map_settings \
			SET space_color=$1, \
			horizontal_spacing=$2, \
			vertical_spacing=$3, \
			"indent"=$4, \
			padding_x=$5, \
			padding_y=$6, \
			space_radius=$7 \
			WHERE map_id=$8 RETURNING *';

	return await pool
		.query({
			text: query,
			values: [
				settings.spaceColor,
				settings.horizontalSpacing,
				settings.verticalSpacing,
				settings.indent,
				settings.paddingX,
				settings.paddingY,
				settings.spaceRadius,
				mapId,
			],
		})
		.then((r) => {
			const data = r.rows?.[0];
			return data;
		})
		.catch((e) => {
			console.error(`ERROR - updateMapSettings(${mapId}): `, e);
			throw new Error('Error updating map settings');
		});
};

export const updateMapImage = async (mapId: string, imageUrl: string) => {
	getMap(mapId);

	const query =
		'UPDATE sd_map_settings SET background_image_url=$1 WHERE map_id=$2 RETURNING background_image_url';

	return pool
		.query({ text: query, values: [imageUrl, mapId] })
		.then((r) => {
			const data = r.rows?.[0];
			return data.background_image_url;
		})
		.catch((e) => {
			console.error(`ERROR - uploadMapImage(${mapId}, ${imageUrl}): `, e);
			throw new Error('Error uploading map image');
		});
};

export const addMapSpaceGroup = async (mapId: string, group: SpaceGroup) => {
	getMap(mapId);

	const query =
		'INSERT INTO sd_map_space_group (map_id, name, prefix) VALUES ($1, $2, $3) RETURNING *';

	return pool
		.query({
			text: query,
			values: [mapId, group.name, group.prefix],
		})
		.then((r) => {
			const spaceGroup = r.rows?.[0] as DBSpaceGroup;
			cachedSpaceGroups.get(mapId)?.push(spaceGroup);
			return spaceGroup;
		})
		.catch((e) => {
			console.error(`ERROR - addMapSpaceGroup(${mapId}, ${group.name}): `, e);
			throw new Error('Error adding space group');
		});
};

export const deleteMapSpaceGroup = async (mapId: string, groupId: string) => {
	getMap(mapId);

	const query = 'DELETE FROM sd_map_space_group WHERE id=$1';
	return await pool
		.query({
			text: query,
			values: [groupId],
		})
		.then(() => {
			const spaceGroups = cachedSpaceGroups.get(mapId);
			if (spaceGroups) {
				spaceGroups.splice(
					spaceGroups.findIndex((g) => g.id === groupId),
					1
				);
			}
			return true;
		})
		.catch((e) => {
			console.error(`ERROR - deleteMapSpaceGroup(${mapId}, ${groupId}): `, e);
			throw new Error('Error deleting space group');
		});
};

export const Map = {
	title: (map: DBMap) => map.name,
	settings: (map: DBMap) => getMapSettings(map.id),
	spaces: async (map: DBMap) => {
		const spaces = await getMapSpaces(map.id);
		return spaces;
	},
	spaceGroups: async (map: DBMap) => getMapSpaceGroups(map.id),
};
