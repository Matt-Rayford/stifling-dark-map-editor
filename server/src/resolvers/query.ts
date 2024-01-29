import { pool } from '..';
import { getFullMap } from './map';

export const Query = {
	map: (root, { id }: { id: string }) => getFullMap(id),
	maps: () => {
		/*
		return db.maps.list();
		*/
	},
	spaceSetting: (root, { id }: { id: string }) => null, // FIX THIS,
	spaceSettings: () => null, // FIX THIS,
};
