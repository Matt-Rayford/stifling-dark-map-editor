import { pool } from '..';
import { DBLightLevel } from '../types/light-level';
import { DBSpaceType } from '../types/space-type';

export const cachedLightLevels: Map<string, DBLightLevel> = new Map();
export const cachedSpaceTypes: Map<string, DBSpaceType> = new Map();

export const initDBCache = async () => {
	initLightLevelCache();
	initSpaceTypesCache();
};

const initLightLevelCache = async () => {
	const query = 'SELECT * FROM sd_map_space_light_level';
	pool
		.query({
			text: query,
		})
		.then((r) => {
			const lightLevels = r.rows as DBLightLevel[];
			lightLevels.map((lightLevel) => {
				cachedLightLevels.set(lightLevel.id, lightLevel);
			});
		})
		.catch((e) => {
			console.error('ERROR - initLightLevelCache(): ', e);
			throw new Error(`Error initializing light level cache`);
		});
};

const initSpaceTypesCache = async () => {
	const query = 'SELECT * FROM sd_map_space_type';

	pool
		.query({
			text: query,
		})
		.then((r) => {
			const spaceTypes = r.rows as DBSpaceType[];
			spaceTypes.map((spaceType) => {
				cachedSpaceTypes.set(spaceType.id, spaceType);
			});
		})
		.catch((e) => {
			console.error('ERROR - initSpaceTypesCache(): ', e);
			throw new Error('Error initializing space type cache');
		});
};
