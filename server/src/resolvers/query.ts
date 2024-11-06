import {
  getUserEmail,
  isSuperAdmin,
  verifyTokenAndGetUser,
  verifyTokenAndGetUserEmail,
} from '@/utils/clerk';

import {
  getRetailAccountByUserId,
  getRetailAccountsToVerify,
} from '@/db/retail/retail-account';
import { getLightLevels } from '@/db/tsd-map/light-level';
import { getMap, getMaps } from '@/db/tsd-map/map';
import { getMapSpaceGroups } from '@/db/tsd-map/space-group';
import { getSpaceTypes } from '@/db/tsd-map/space-type';
import { getMapSpaces } from '@/db/tsd-map/space';
import { getUser } from '@/db/user/user';
import { beerCan } from '@/types/beer/beercan';

export const Query = {
  beerCan: (_, args: { name: string }) => {
    const { name } = args;
    const beerCans: beerCan[] = [
      { id: '12345', name: 'Schlitz' },
      { id: '67890', name: 'Blatz' },
      { id: '99999', name: 'Schlitz' },
    ];
    return beerCans.filter((beerCan) => beerCan.name === name);
  },
  lightLevels: () => getLightLevels(),
  getRetailAccount: async (root, _, context) => {
    const clerkUser = await verifyTokenAndGetUser(context.token);
    const email = getUserEmail(clerkUser);

    const user = await getUser(email, clerkUser.id);
    return getRetailAccountByUserId(user.id);
  },
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
  retailAccountsToVerify: async (root, _, context) => {
    const user = await verifyTokenAndGetUser(context.token);

    if (user && isSuperAdmin(user)) {
      return getRetailAccountsToVerify();
    }
    return [];
  },
  spaceTypes: () => getSpaceTypes(),
  user: async (root, { email }: { email: string }, context) => {
    if (context.token) {
      const user = await verifyTokenAndGetUser(context.token);
      return getUser(email, user.id);
    }
  },
};
