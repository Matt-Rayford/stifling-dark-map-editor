const db = require('./db');
const { pool } = require('./server');

const Query = {
	map: (root, { id }) => {
		console.log('GET MAP: ', id);
		const query =
			'SELECT * \
			FROM sd_map sm \
			INNER JOIN sd_map_settings sms ON sms.map_id = sm.id \
			WHERE sm.id=$1';

		return pool
			.query({
				rowAsArray: true,
				text: query,
				values: [id],
			})
			.then((r) => {
				const data = r.rows?.[0];
				console.log('GET MAP: ', data);
				return {
					id: data.id,
					title: data.name,
					settings: {
						backgroundImageUrl: data.background_image_url,
						spaceColor: data.spaceColor,
						horizontalSpacing: data.horizontalSpacing,
					},
				};
			})
			.catch((e) => {
				throw new Error(`Cannot retrieve your map as it cannot be found`);
			});
	},
	maps: () => {
		return db.maps.list();
	},
	spaceSetting: (root, { id }) => db.spaceSettings.get(id),
	spaceSettings: () => db.spaceSettings.list(),
};

const getMap = async (mapId) => {
	const query = 'SELECT * FROM sd_map WHERE id=$1';

	const map = await pool
		.query({
			rowAsArray: true,
			text: query,
			values: [mapId],
		})
		.then((r) => {
			const data = r.rows?.[0];
			return data;
		})
		.catch((e) => {
			console.log('ERROR: ', e);
			throw new Error(`Cannot upload image for your map as it cannot be found`);
		});

	if (!map || !map.id) {
		throw new Error(`Cannot upload image for your map as it cannot be found`);
	}

	return map;
};

const Mutation = {
	addMapSpaceGroup: async (root, { mapId, group }) => {
		getMap(mapId);

		const query =
			'INSERT INTO sd_map_space_group (map_id, name, prefix) VALUES ($1, $2, $3) RETURNING *';

		return pool
			.query({
				rowAsArray: true,
				text: query,
				values: [mapId, group.name, group.prefix],
			})
			.then((r) => {
				const data = r.rows?.[0];
				return data;
			})
			.catch((e) => {
				throw e;
			});
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
	deleteMapSpaceGroup: async (root, { mapId, groupId }) => {
		getMap(mapId);

		const query = 'DELETE FROM sd_map_space_group WHERE id=$1';
		return await pool
			.query({
				text: query,
				values: [groupId],
			})
			.then((r) => {
				return true;
			})
			.catch((e) => {
				throw e;
			});
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
	updateMapSettings: async (root, { mapId, settings }) => {
		getMap();

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
				rowAsArray: true,
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
				throw e;
			});
	},
	updateMapSpaceGroup: async (root, { mapId, group }) => {
		getMap(mapId);

		const query =
			'UPDATE sd_map_space_group SET name=$1, prefix=$2 WHERE id=$3 RETURNING *';

		return pool
			.query({
				rowAsArray: true,
				text: query,
				values: [groupId],
			})
			.then((r) => {
				const data = r.rows?.[0];
				return data;
			})
			.catch((e) => {
				throw e;
			});
	},
	uploadMapImage: async (root, { mapId, imageUrl }) => {
		getMap(mapId);

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
