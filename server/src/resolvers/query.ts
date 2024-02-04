import { getLightLevels } from './light-level';
import { getMap, getMaps } from './map';
import { getMapSpaces } from './space';
import { getMapSpaceGroups } from './space-group';
import { getSpaceTypes } from './space-type';
import { getUser } from './user';

export const Query = {
	lightLevels: () => getLightLevels(),
	map: (root, { id }: { id: string }) => getMap(id),
	maps: (root, { email }: { email: string }) => getMaps(email),
	mapSpaceGroups: (root, { mapId }: { mapId: string }) =>
		getMapSpaceGroups(mapId),
	mapSpaces: (root, { mapId }: { mapId: string }) => getMapSpaces(mapId),
	spaceTypes: () => getSpaceTypes(),
	user: (root, { email }: { email: string }) => getUser(email),
};
