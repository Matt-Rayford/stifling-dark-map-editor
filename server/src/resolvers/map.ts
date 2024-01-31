import { pool } from '..';
import { DBMap } from '../types/map';
import { MapSettings } from '../types/map-settings';
import { SpaceGroup } from '../types/space-group';
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
			const data = r.rows?.[0];
			return data;
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
			return true;
		})
		.catch((e) => {
			console.error(`ERROR - deleteMapSpaceGroup(${mapId}, ${groupId}): `, e);
			throw new Error('Error deleting space group');
		});
};

export const updateMapSpaceGroup = async (mapId: string, group: SpaceGroup) => {
	getMap(mapId);

	const query =
		'UPDATE sd_map_space_group SET name=$1, prefix=$2 WHERE id=$3 RETURNING *';

	return pool
		.query({
			text: query,
			values: [group.id],
		})
		.then((r) => {
			const data = r.rows?.[0];
			return data;
		})
		.catch((e) => {
			console.error(`ERROR - updateMapSpaceGroup(${mapId}, ${group.id}): `, e);
			throw new Error('Error updating space group');
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
