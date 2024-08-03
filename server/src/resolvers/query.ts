import { getLightLevels } from './light-level';
import { getMap, getMaps } from './map';
import { getMapSpaces } from './space';
import { getMapSpaceGroups } from './space-group';
import { getSpaceTypes } from './space-type';
import { getUser } from './user';
import { verifyTokenAndGetUser, verifyTokenAndGetUserEmail } from '@/utils/clerk';

export const Query = {
	lightLevels: () => getLightLevels(),
	map: async (root, { id }: { id: string }, context) => {
		if (context.token) {
			const email = await verifyTokenAndGetUserEmail(context.token);
			return getMap(id, email);
		}
		return null;
	},
	maps: async (root, _, context) => {
		if (context.token) {
			const email = await verifyTokenAndGetUserEmail(context.token);
			return getMaps(email);
		}
		throw new Error('Cannot retrieve user maps, no token');
	},
	mapSpaceGroups: (root, { mapId }: { mapId: string }) =>
		getMapSpaceGroups(mapId),
	mapSpaces: (root, { mapId }: { mapId: string }) => getMapSpaces(mapId),
	retailersToVerify: async (root, _, context) => {
    const user = await verifyTokenAndGetUser(context.token);

    if(user) {
      return [];
    }
    return [];
  },
	spaceTypes: () => getSpaceTypes(),
	user: async (root, { email }: { email: string }, context) => {
		if (context.token) {
			const user = await verifyTokenAndGetUser(context.token);
			return getUser(email, user.id)
		}
	},
};
