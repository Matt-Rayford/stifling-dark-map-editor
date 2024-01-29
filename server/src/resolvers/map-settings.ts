import { pool } from '..';
import { DBMapSettings } from '../types/map-settings';

export const getMapSettings = async (mapId: string): Promise<DBMapSettings> => {
	const query = 'SELECT * FROM sd_map_settings WHERE map_id=$1';

	return pool
		.query({
			text: query,
			values: [mapId],
		})
		.then((r) => {
			return r.rows?.[0];
		})
		.catch((e) => {
			console.log(e);
			throw new Error(`Error retrieving map settings`);
		});
};

export const MapSettings = {
	backgroundImageUrl: (settings: DBMapSettings) =>
		settings.background_image_url,
	spaceColor: (settings: DBMapSettings) => settings.space_color,
	horizontalSpacing: (settings: DBMapSettings) => settings.horizontal_spacing,
	verticalSpacing: (settings: DBMapSettings) => settings.vertical_spacing,
	paddingX: (settings: DBMapSettings) => settings.padding_x,
	paddingY: (settings: DBMapSettings) => settings.padding_y,
	spaceRadius: (settings: DBMapSettings) => settings.space_radius,
};
