import { getLightLevels } from './light-level';
import { getMap, getMaps } from './map';
import { getMapSpaces } from './space';
import { getMapSpaceGroups } from './space-group';
import { getSpaceTypes } from './space-type';

export const Query = {
	lightLevels: () => getLightLevels(),
	map: (root, { id }: { id: string }) => getMap(id),
	maps: () => getMaps(),
	mapSpaceGroups: (root, { mapId }: { mapId: string }) =>
		getMapSpaceGroups(mapId),
	mapSpaces: (root, { mapId }: { mapId: string }) => getMapSpaces(mapId),
	spaceTypes: () => getSpaceTypes(),
};
