import { pool } from '..';
import { MapSettings } from '../types/map-settings';
import { SpaceGroup } from '../types/space-group';
import {
	addMapSpaceGroup,
	deleteMapSpaceGroup,
	getMap,
	renameMap,
	updateMapImage,
	updateMapSettings,
	updateMapSpaceGroup,
} from './map';
import { deleteSpace } from './space';

export const Mutation = {
	addMapSpaceGroup: async (
		root,
		{ mapId, group }: { mapId: string; group: SpaceGroup }
	) => addMapSpaceGroup(mapId, group),
	createMap: (root, { title }) => {},
	deleteMapSpaceGroup: async (
		root,
		{ mapId, groupId }: { mapId: string; groupId: string }
	) => deleteMapSpaceGroup(mapId, groupId),
	deleteSpace: (root, { spaceId }: { spaceId: string }) => deleteSpace(spaceId),
	renameMap: (root, { mapId, mapName }: { mapId: string; mapName: string }) =>
		renameMap(mapId, mapName),
	updateMap: (root, { mapId, spaceData, mapSettings }) => {},
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
