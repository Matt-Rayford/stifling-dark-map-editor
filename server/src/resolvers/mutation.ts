import {
  isSuperAdmin,
  verifyTokenAndGetUser,
  verifyTokenAndGetUserEmail,
} from '@/utils/clerk';

import { createContact } from '@/db/user/contact';
import {
  approvalRetailAccount,
  createRetailAccount,
  rejectRetailAccount,
} from '@/db/retail/retail-account';
import { createRetailAddress } from '@/db/retail/retail-address';
import {
  addMapSpaceGroup,
  createMap,
  deleteMapSpaceGroup,
  renameMap,
  updateMapImage,
  updateMapSettings,
} from '@/db/tsd-map/map';
import { updateSpaceGroup } from '@/db/tsd-map/space-group';
import {
  connectSpaces,
  deleteSpace,
  disconnectSpaces,
  updateSpace,
} from '@/db/tsd-map/space';
import { getUser, updateUserSettings } from '@/db/user/user';

import { RetailAccountInput } from '@/types/retail/retail-account';
import { RetailAddressInput } from '@/types/retail/retail-address';
import { SpaceGroup } from '@/types/tsd-map/space-group';
import { MapSettings } from '@/types/tsd-map/map-settings';
import { SpaceInput } from '@/types/tsd-map/space';
import { Approval } from '@/utils/approval';

export const Mutation = {
  addMapSpaceGroup: async (
    root,
    { mapId, group }: { mapId: string; group: SpaceGroup },
    context
  ) => {
    if (context.token) {
      const email = await verifyTokenAndGetUserEmail(context.token);
      return addMapSpaceGroup(mapId, email, group);
    }
    return null;
  },
  connectSpaces: async (
    root,
    { space1Id, space2Id }: { space1Id: string; space2Id: string }
  ) => connectSpaces(space1Id, space2Id),
  disconnectSpaces: async (
    root,
    { space1Id, space2Id }: { space1Id: string; space2Id: string }
  ) => disconnectSpaces(space1Id, space2Id),
  createMap: (root, { title, email }: { title: string; email: string }) =>
    createMap(title, email),
  deleteMapSpaceGroup: async (
    root,
    { mapId, groupId }: { mapId: string; groupId: string },
    context
  ) => {
    if (context.token) {
      const email = await verifyTokenAndGetUserEmail(context.token);
      return deleteMapSpaceGroup(mapId, email, groupId);
    }
    return false;
  },
  deleteSpace: (root, { mapId, spaceId }: { mapId: string; spaceId: string }) =>
    deleteSpace(mapId, spaceId),
  renameMap: async (
    root,
    { mapId, mapName }: { mapId: string; mapName: string },
    context
  ) => {
    if (context.token) {
      const email = await verifyTokenAndGetUserEmail(context.token);
      return renameMap(mapId, email, mapName);
    }
    return null;
  },
  requestRetailAccount: async (
    root,
    {
      retailAccountInfo,
      addressInfo,
    }: {
      retailAccountInfo: RetailAccountInput;
      addressInfo: RetailAddressInput;
    },
    context
  ) => {
    if (context.token) {
      const clerkUser = await verifyTokenAndGetUser(context.token);
      const email = clerkUser.emailAddresses?.[0]?.emailAddress;

      if (email) {
        const user = await getUser(email, clerkUser.id);
        if (user) {
          const retailAccount = await createRetailAccount(
            retailAccountInfo.name,
            retailAccountInfo.taxId,
            user.id
          );

          if (retailAccount) {
            const contact = await createContact(addressInfo.contact);

            if (contact) {
              await createRetailAddress(
                retailAccount.id,
                addressInfo,
                contact.id
              );
            }
            return retailAccount;
          }
        }
      }
    }
    return null;
  },
  updateMapSettings: async (
    root,
    { mapId, settings }: { mapId: string; settings: MapSettings },
    context
  ) => {
    if (context.token) {
      const email = await verifyTokenAndGetUserEmail(context.token);
      updateMapSettings(mapId, email, settings);
    }
    return null;
  },
  updateMapSpaceGroup: async (
    root,
    { mapId, group }: { mapId: string; group: SpaceGroup }
  ) => updateSpaceGroup(mapId, group),
  updateRetailAccountApproval: async (
    root,
    { id, approval }: { id: string; approval: Approval },
    context
  ) => {
    const user = await verifyTokenAndGetUser(context.token);

    if (user && isSuperAdmin(user)) {
      if (approval === Approval.Approved) {
        return approvalRetailAccount(id);
      } else {
        return rejectRetailAccount(id);
      }
    }

    throw new Error(
      'You are not authorized to modify retail account approvals'
    );
  },
  updateUserSettings: async (
    root,
    {
      settings: { email, viewedSetup },
    }: {
      settings: {
        email: string;
        viewedSetup: boolean;
      };
    }
  ) => updateUserSettings(email, viewedSetup),
  uploadMapImage: async (
    root,
    { mapId, imageUrl }: { mapId: string; imageUrl: string },
    context
  ) => {
    if (context.token) {
      const email = await verifyTokenAndGetUserEmail(context.token);
      return updateMapImage(mapId, email, imageUrl);
    }
    return null;
  },
  updateSpace: async (root, { space }: { space: SpaceInput }) =>
    updateSpace(space),
};
