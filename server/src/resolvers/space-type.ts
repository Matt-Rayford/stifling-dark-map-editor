import { pool } from '..';
import { DBSpaceType } from '../types/space-type';

const cachedSpaceTypes: Map<string, DBSpaceType> = new Map();

export const getSpaceTypes = async (): Promise<DBSpaceType[]> => {
	if (!cachedSpaceTypes.size) {
		const query = 'SELECT * FROM sd_map_space_type';

		const spaceTypes = await pool
			.query({
				text: query,
			})
			.then((r) => {
				return r.rows as DBSpaceType[];
			})
			.catch((e) => {
				console.error('ERROR - getSpaceTypes(): ', e);
				throw new Error('Error getting space types');
			});

		spaceTypes.map((spaceType) => {
			cachedSpaceTypes.set(spaceType.id, spaceType);
		});
		return spaceTypes;
	}
	return Array.from(cachedSpaceTypes.values());
};

export const getSpaceTypeById = async (id: string): Promise<DBSpaceType> => {
	if (!cachedSpaceTypes.size) {
		await getSpaceTypes();
	}

	return cachedSpaceTypes.get(id);
};

export const SpaceType = {
	iconUrl: (spaceType: DBSpaceType) => spaceType.icon_url,
};
