import { DBLightLevel } from '../types/light-level';
import { cachedLightLevels, initDBCache } from '../utils/cache';

export const getLightLevels = async (): Promise<DBLightLevel[]> => {
	if (!cachedLightLevels.size) {
		await initDBCache();
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
