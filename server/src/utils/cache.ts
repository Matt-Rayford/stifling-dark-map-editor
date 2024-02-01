import { pool } from '..';
import { DBLightLevel } from '../types/light-level';
import { DBSpaceGroup, SpaceGroup } from '../types/space-group';
import { DBSpaceType } from '../types/space-type';

export const cachedLightLevels: Map<string, DBLightLevel> = new Map();
export const cachedSpaceTypes: Map<string, DBSpaceType> = new Map();
export const cachedSpaceGroups: Map<string, SpaceGroup[]> = new Map();

export const initDBCache = async () => {
	initLightLevelCache();
	initSpaceTypesCache();
	initSpaceGroupsCache();
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

export const initSpaceGroupsCache = async () => {
	const query = 'SELECT * FROM sd_map_space_group';

	pool
		.query({
			text: query,
		})
		.then((r) => {
			const spaceGroups = r.rows as DBSpaceGroup[];

			for (let spaceGroup of spaceGroups) {
				if (!cachedSpaceGroups.has(spaceGroup.map_id)) {
					cachedSpaceGroups.set(spaceGroup.map_id, [spaceGroup]);
				} else {
					const cache = cachedSpaceGroups.get(spaceGroup.map_id);
					cache.push(spaceGroup);
				}
			}
		})
		.catch((e) => {
			console.error('ERROR - initSpaceGroupsCache(): ', e);
			throw new Error('Error initializing space groups');
		});
};
