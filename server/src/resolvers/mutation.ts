import { MapSettings } from '../types/map-settings';
import { SpaceInput } from '../types/space';
import { SpaceGroup } from '../types/space-group';
import { verifyTokenAndGetUser, verifyTokenAndGetUserEmail } from '@/utils/clerk';
import {
	addMapSpaceGroup,
	createMap,
	deleteMapSpaceGroup,
	renameMap,
	updateMapImage,
	updateMapSettings,
} from './map';
import {
	connectSpaces,
	deleteSpace,
	disconnectSpaces,
	updateSpace,
} from './space';
import { updateSpaceGroup } from './space-group';
import { getUser, updateUserSettings } from './user';
import { RetailerInput } from '@/types/retailer/retailer';
import { RetailerAddressInput } from '@/types/retailer/retailer-address';
import { createRetailAccount } from './retailer/retailer';
import { createContact } from './user/contact';
import { createRetailerAddress } from './retailer/retailer-address';

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
	requestRetailAccount: async (root, {companyInfo, addressInfo}: {companyInfo: RetailerInput, addressInfo: RetailerAddressInput}, context) => {
		if (context.token) {
			const clerkUser = await verifyTokenAndGetUser(context.token);
			const email = clerkUser.emailAddresses?.[0]?.emailAddress;

			if(email) {
				const user = await getUser(email, clerkUser.id);
				if(user) {
					const retailer = await createRetailAccount(companyInfo.name, companyInfo.taxId, user.id)

					if(retailer) {
						const contact = await createContact(addressInfo.contact);

						if(contact) {
							await createRetailerAddress(retailer.id, addressInfo, contact.id);
						}
						return retailer;
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
