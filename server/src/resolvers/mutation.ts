import { MapSettings } from '../types/map-settings';
import { SpaceGroup } from '../types/space-group';
import {
	addMapSpaceGroup,
	createMap,
	deleteMapSpaceGroup,
	renameMap,
	updateMapImage,
	updateMapSettings,
	updateMapSpaceGroup,
} from './map';
import { connectSpaces, deleteSpace, disconnectSpaces } from './space';

export const Mutation = {
	addMapSpaceGroup: async (
		root,
		{ mapId, group }: { mapId: string; group: SpaceGroup }
	) => addMapSpaceGroup(mapId, group),
	connectSpaces: async (
		root,
		{ space1Id, space2Id }: { space1Id: string; space2Id: string }
	) => connectSpaces(space1Id, space2Id),
	disconnectSpaces: async (
		root,
		{ space1Id, space2Id }: { space1Id: string; space2Id: string }
	) => disconnectSpaces(space1Id, space2Id),
	createMap: (root, { title }) => createMap(title),
	deleteMapSpaceGroup: async (
		root,
		{ mapId, groupId }: { mapId: string; groupId: string }
	) => deleteMapSpaceGroup(mapId, groupId),
	deleteSpace: (root, { mapId, spaceId }: { mapId: string; spaceId: string }) =>
		deleteSpace(mapId, spaceId),
	renameMap: (root, { mapId, mapName }: { mapId: string; mapName: string }) =>
		renameMap(mapId, mapName),
	updateMapSettings: async (
		root,
		{ mapId, settings }: { mapId: string; settings: MapSettings }
	) => updateMapSettings(mapId, settings),
	updateMapSpaceGroup: async (
		root,
		{ mapId, group }: { mapId: string; group: SpaceGroup }
	) => updateMapSpaceGroup(mapId, group),
	uploadMapImage: async (
		root,
		{ mapId, imageUrl }: { mapId: string; imageUrl: string }
	) => updateMapImage(mapId, imageUrl),
};
