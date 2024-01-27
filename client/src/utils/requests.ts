import { SDMap } from '../models/map';
import { MapSettings } from '../models/map-settings';

const endpointURL =
	process.env.REACT_APP_GRAPHQL_ENDPOINT_URL ?? 'http://localhost:9000/graphql';

export async function createMap(title: string): Promise<SDMap> {
	const mutation = `
    mutation CreateMap($title: String) {
      map: createMap(title: $title){
        id
        title
      }
    }
  `;
	const { map } = await graphqlRequest(mutation, { title });
	return map;
}

export async function updateMap(
	id: string,
	spaceData: any,
	settings: MapSettings
): Promise<SDMap> {
	const mutation = `
    mutation UpdateMap($id: ID, $spaceData: Object, $settings: MapSettingsInput) {
      map: updateMap(mapId: $id, spaceData: $spaceData, settings: $settings) {
        id
        title
				settings {
					backgroundImageUrl
					spaceColor
					horizontalSpacing
					verticalSpacing
					indent
					paddingX
					paddingY
					spaceRadius
				}
        spaces {
          id
          number
          type
          lightLevel
          connections
					isDeleted
					group
				}
      }
    }
  `;
	const { map } = await graphqlRequest(mutation, {
		id,
		spaceData,
		settings,
	});
	return map;
}

export async function updateMapSettings(
	id: string,
	settings: MapSettings
): Promise<MapSettings> {
	const mutation = `
    mutation UpdateMapSettings($id: ID, $settings: MapSettingsInput) {
      map: updateMapSettings(mapId: $id, settings: $settings) {
				settings {
					backgroundImageUrl
					spaceColor
					horizontalSpacing
					verticalSpacing
					indent
					paddingX
					paddingY
					spaceRadius
				}
      }
    }
  `;
	console.log('CALL GQL: ', settings);
	const { map } = await graphqlRequest(mutation, { id, settings });
	return map;
}

export async function loadMap(id: string): Promise<SDMap> {
	const query = `
		query LoadMap($id: ID!) {
			map(id: $id) {
				id
				title
				settings {
					backgroundImageUrl
					spaceColor
					horizontalSpacing
					verticalSpacing
					indent
					paddingX
					paddingY
					spaceRadius
				}
				spaces {
          id
          number
          type
          lightLevel
          row
          col
          connections
					isDeleted
					group
				}
				spaceGroups {
					id
					name
					prefix
				}
			}
		}
	`;
	const { map } = await graphqlRequest(query, { id });
	return map;
}

export async function loadMaps(): Promise<Pick<SDMap, 'id' | 'title'>[]> {
	const query = `
    query LoadMaps{
      maps {
        id
        title
      }
    }
  `;
	const { maps } = await graphqlRequest(query);
	return maps;
}

export async function updateMapSpaceGroup(
	mapId: string,
	group: any
): Promise<SpaceGroup> {
	const query = `
    mutation UpdateMapSpaceGroup($mapId: ID!, $group: SpaceGroupInput) {
			updatedGroup: updateMapSpaceGroup(mapId: $mapId, group: $group) {
				id
				name
				prefix
			}
    }
  `;
	const { updatedGroup } = await graphqlRequest(query, {
		mapId,
		group,
	});
	return updatedGroup;
}

export async function addMapSpaceGroup(
	mapId: string,
	group: any
): Promise<SpaceGroup> {
	const query = `
    mutation AddMapSpaceGroup($mapId: ID!, $group: SpaceGroupInput) {
			newGroup: addMapSpaceGroup(mapId: $mapId, group: $group) {
				id
				name
				prefix
			}
    }
  `;
	const { newGroup } = await graphqlRequest(query, {
		mapId,
		group,
	});
	return newGroup;
}

export async function deleteMapSpaceGroup(
	mapId: string,
	groupId: number
): Promise<boolean> {
	const query = `
    mutation DeleteMapSpaceGroup($mapId: ID!, $groupId: ID!) {
			wasSuccess: deleteMapSpaceGroup(mapId: $mapId, groupId: $groupId)
    }
  `;
	const { wasSuccess } = await graphqlRequest(query, {
		mapId,
		groupId,
	});
	return wasSuccess;
}

export async function uploadMapImage(mapId: String, imageUrl: String) {
	const query = `
		mutation UploadMapImage($mapId: ID!, $imageUrl: String!) {
			uploadMapImage(mapId: $mapId, imageUrl: $imageUrl)
		}
	`;
	await graphqlRequest(query, {
		mapId,
		imageUrl,
	});
}

async function graphqlRequest(query: any, variables: any = {}) {
	const request = {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({
			query,
			variables,
		}),
	};
	const response = await fetch(endpointURL, request);
	const responseBody = await response.json();
	if (responseBody.errors) {
		const message = responseBody.errors
			.map((error: any) => error.message)
			.join('\n');
		throw new Error(message);
	}
	return responseBody.data;
}
