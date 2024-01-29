import { pool } from '..';
import { DBLightLevel } from '../types/light-level';

const cachedLightLevels: Map<string, DBLightLevel> = new Map();

export const getLightLevels = async (): Promise<DBLightLevel[]> => {
	if (!cachedLightLevels.size) {
		const query = 'SELECT * FROM sd_map_space_light_level';
		const lightLevels = await pool
			.query({
				text: query,
			})
			.then((r) => {
				return r.rows as DBLightLevel[];
			})
			.catch((e) => {
				throw new Error(`Error retrieving light levels`);
			});
		lightLevels.map((lightLevel) => {
			cachedLightLevels.set(lightLevel.id, lightLevel);
		});
		return lightLevels;
	}
	return Array.from(cachedLightLevels.values());
};

export const getLightLevelById = async (id: string): Promise<DBLightLevel> => {
	if (!cachedLightLevels.size) {
		await getLightLevels();
	}

	return cachedLightLevels.get(id);
};

export const LightLevel = {
	movementPoints: (lightLevel: DBLightLevel) => lightLevel.movement_points,
};
