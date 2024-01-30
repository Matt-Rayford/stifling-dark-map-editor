import { pool } from '..';
import { getMap } from './map';

export const Mutation = {
	addMapSpaceGroup: async (root, { mapId, group }) => {
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
	},
	createMap: (root, { title }) => {
		/*
		const id = db.maps.create({
			title,
			spaces: [],
			mapSettings: {
				backgroundImageUrl: '',
				spaceColor: '#cfcfcf',
				horizontalSpacing: 61.0,
				verticalSpacing: 76.0,
				indent: 29.0,
				paddingX: 57.95,
				paddingY: 50.3,
				spaceRadius: 15.0,
			},
		});
		return db.maps.get(id);
		*/
	},
	deleteMapSpaceGroup: async (root, { mapId, groupId }) => {
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
	},
	renameMap: (root, { mapId, mapName }) => {
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
	},
	updateMap: (root, { mapId, spaceData, mapSettings }) => {
		/*
		//@ts-ignore
		const { title, spaceGroups } = db.maps.get(mapId);
		db.maps.update({
			id: mapId,
			//@ts-ignore
			title: title,
			mapSettings,
			spaces: spaceData,
			spaceGroups,
		});
		return db.maps.get(mapId);
		*/
	},
	updateMapSettings: async (root, { mapId, settings }) => {
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
				console.error(
					`ERROR - updateMapSettings(${mapId}, ${settings.id}): `,
					e
				);
				throw new Error('Error updating map settings');
			});
	},
	updateMapSpaceGroup: async (root, { mapId, group }) => {
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
				console.error(
					`ERROR - updateMapSpaceGroup(${mapId}, ${group.id}): `,
					e
				);
				throw new Error('Error updating space group');
			});
	},
	uploadMapImage: async (root, { mapId, imageUrl }) => {
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
	},
};
