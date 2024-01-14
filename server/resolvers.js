const db = require('./db');
const { pool } = require('./server');

const Query = {
	map: (root, { id }) => {
		return db.maps.get(id);
	},
	maps: () => {
		return db.maps.list();
	},
	spaceSetting: (root, { id }) => db.spaceSettings.get(id),
	spaceSettings: () => db.spaceSettings.list(),
};

const Mutation = {
	addMapSpaceGroup: (root, { mapId, group }) => {
		const map = db.maps.get(mapId);
		if (!map)
			throw new Error(`Cannot update map with id ${mapId}. It does not exist.`);
		let { spaceGroups } = map;
		if (!spaceGroups || spaceGroups.length === 0) {
			group.id = 0;
			spaceGroups = [];
		} else {
			let maxId = -1;
			for (let group of spaceGroups)
				if (maxId <= group.id) maxId = group.id + 1;

			group.id = maxId;
		}
		spaceGroups.push(group);

		db.maps.update({
			id: mapId,
			title: map.title,
			mapSettings: map.settings,
			spaces: map.spaces,
			spaceGroups,
		});
		return db.maps.get(mapId).spaceGroups.filter((g) => g.id === group.id)[0];
	},
	createMap: (root, { title }) => {
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
	},
	deleteMapSpaceGroup: (root, { mapId, groupId }) => {
		const map = db.maps.get(mapId);
		if (!map)
			throw new Error(`Cannot update map with id ${mapId}. It does not exist.`);

		let { spaceGroups } = map;
		spaceGroups = spaceGroups.filter((g) => g.id !== parseInt(groupId));

		db.maps.update({
			id: mapId,
			title: map.title,
			mapSettings: map.settings,
			spaces: map.spaces,
			spaceGroups,
		});
		return true;
	},
	renameMap: (root, { mapId, mapName }) => {
		const query = 'UPDATE sd_map SET name=$1 where id=$2 RETURNING name';
		return pool
			.query({ rowAsArray: true, text: query, values: [mapName, mapId] })
			.then((r) => {
				const data = r.rows?.[0];
				return data.name;
			})
			.catch((e) => {
				throw e;
			});
	},
	updateMap: (root, { mapId, spaceData, mapSettings }) => {
		const { title, spaceGroups } = db.maps.get(mapId);
		db.maps.update({
			id: mapId,
			title: title,
			mapSettings,
			spaces: spaceData,
			spaceGroups,
		});
		return db.maps.get(mapId);
	},
	updateMapSettings: (root, { mapId, mapSettings }) => {
		const map = db.maps.get(mapId);
		if (!map)
			throw new Error(`Cannot update map with id ${mapId}. It does not exist.`);
		const { title, spaces, spaceGroups } = map;
		db.maps.update({
			id: mapId,
			title,
			mapSettings,
			spaces,
			spaceGroups,
		});
		return db.maps.get(mapId);
	},
	updateMapSpaceGroup: (root, { mapId, group }) => {
		const map = db.maps.get(mapId);
		if (!map)
			throw new Error(`Cannot update map with id ${mapId}. It does not exist.`);
		const { spaceGroups } = map;
		if (spaceGroups.some((g) => g.id === group.id)) {
			const existingGroup = spaceGroups.filter((g) => g.id === group.id)[0];
			existingGroup.name = group.name;
			existingGroup.prefix = group.prefix;

			db.maps.update({
				id: mapId,
				title: map.title,
				settings: map.settings,
				spaces: map.spaces,
				spaceGroups,
			});
			return db.maps.get(mapId).spaceGroups.filter((g) => g.id === group.id)[0];
		} else
			throw new Error(
				`Cannot update space group, since group ${group.id} does not exist`
			);
	},
	uploadMapImage: async (root, { mapId, imageUrl }) => {
		const map = await pool
			.query({
				rowAsArray: true,
				text: 'SELECT * FROM sd_map WHERE id=$1',
				values: [mapId],
			})
			.then((r) => r.rows?.[0]);
		if (!map || !map.id) {
			throw new Error(`Cannot upload image for your map as it cannot be found`);
		}

		const query =
			'UPDATE sd_map_settings SET background_image_url=$1 WHERE map_id=$2 RETURNING background_image_url';
		return pool
			.query({ rowAsArray: true, text: query, values: [imageUrl, mapId] })
			.then((r) => {
				const data = r.rows?.[0];
				return data.background_image_url;
			})
			.catch((e) => {
				throw e;
			});
	},
};

const Space = {
	settings: (space) => db.spaceSettings.get(space.type),
};

const Map = {
	settings: (map) => {
		const query = 'SELECT * FROM sd_map_settings WHERE map_id=$1';
		return pool
			.query({ rowAsArray: true, text: query, values: [map.id] })
			.then((r) => {
				const data = r.rows?.[0];
				return {
					id: data.id,
					mapId: data.map_id,
					backgroundImageUrl: data.background_image_url,
					spaceColor: data.space_color,
					horizontalSpacing: data.horizontal_spacing,
					verticalSpacing: data.vertical_spacing,
					indent: data.indent,
					paddingX: data.padding_x,
					paddingY: data.padding_y,
					spaceRadius: data.space_radius,
				};
			})
			.catch((e) => {
				throw e;
			});
	},
};

module.exports = { Query, Mutation, Space, Map };
