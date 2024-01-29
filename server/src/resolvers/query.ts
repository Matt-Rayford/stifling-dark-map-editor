import { getMap } from './map';
import { getMapSpaces } from './space';
import { getMapSpaceGroups } from './space-group';

export const Query = {
	map: (root, { id }: { id: string }) => getMap(id),
	maps: () => {
		/*
		return db.maps.list();
		*/
	},
	mapSpaceGroups: (root, { mapId }: { mapId: string }) =>
		getMapSpaceGroups(mapId),
	mapSpaces: (root, { mapId }: { mapId: string }) => getMapSpaces(mapId),
	spaceSetting: (root, { id }: { id: string }) => null, // FIX THIS,
	spaceSettings: () => null, // FIX THIS,
};
