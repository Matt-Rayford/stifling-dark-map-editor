import { pool } from '..';

export const getMap = async (mapId: string) => {
	const query = 'SELECT * FROM sd_map WHERE id=$1';

	const map = await pool
		.query({
			text: query,
			values: [mapId],
		})
		.then((r) => {
			const data = r.rows?.[0];
			return data;
		})
		.catch((e) => {
			throw new Error(`Cannot upload image for your map as it cannot be found`);
		});

	if (!map || !map.id) {
		throw new Error(`Cannot upload image for your map as it cannot be found`);
	}

	return map;
};

export const getFullMap = async (mapId: string) => {
	const query =
		'SELECT * \
			FROM sd_map sm \
			INNER JOIN sd_map_settings sms ON sms.map_id = sm.id \
			WHERE sm.id=$1';

	return pool
		.query({
			text: query,
			values: [mapId],
		})
		.then((r) => {
			const data = r.rows?.[0];

			return {
				id: data.id,
				title: data.name,
				settings: {
					backgroundImageUrl: data.background_image_url,
					spaceColor: data.spaceColor,
					horizontalSpacing: data.horizontalSpacing,
					verticalSpacing: data.verticalSpacing,
					indent: data.indent,
					paddingX: data.padding_x,
					paddingY: data.padding_y,
					spaceRadius: data.spaceRadius,
				},
			};
		});
};

export const Map = {
	settings: (map) => {
		const query = 'SELECT * FROM sd_map_settings WHERE map_id=$1';
		return pool
			.query({ text: query, values: [map.id] })
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
