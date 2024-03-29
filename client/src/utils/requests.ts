import { MapSettings } from '../graphql/__generated__/graphql';
import { SDMap } from '../models/map';
import { SpaceInput } from '../models/space';

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
					displayNumber
          type {
						id
						color
					}
          lightLevel {
						id
						name
						movementPoints
					}
          connections
					isDeleted
					group {
						id
						name
						prefix
					}
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
	const { map } = await graphqlRequest(mutation, { id, settings });
	return map;
}

export async function updateMapSpaceGroup(
	mapId: string,
	group: any
): Promise<SpaceGroup> {
	const query = `
    mutation UpdateMapSpaceGroup($mapId: ID!, $group: SpaceGroupInput!) {
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
    mutation AddMapSpaceGroup($mapId: ID!, $group: SpaceGroupInput!) {
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
	groupId: string
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

export async function getLightLevels() {
	const query = `
		query LightLevels {
			lightLevels {
				id
				name
				movementPoints
			}
		}
	`;
	const { lightLevels } = await graphqlRequest(query);
	return lightLevels;
}

export async function getSpaceTypes() {
	const query = `
		query SpaceTypes {
			spaceTypes {
				id
				color
				iconUrl
				description
				name
			}
		}
	`;
	const { spaceTypes } = await graphqlRequest(query);
	return spaceTypes;
}

export async function deleteSpace(mapId: string, spaceId: string) {
	const query = `
	  mutation DeleteSpace($mapId: ID!, $spaceId: ID!) {
			deleteSpace(mapId: $mapId, spaceId: $spaceId)
		}
	`;

	const { deleteSpace } = await graphqlRequest(query, { mapId, spaceId });
	return deleteSpace;
}

export async function connectSpaces(space1Id: string, space2Id: string) {
	const query = `
		mutation ConnectSpaces($space1Id: ID!, $space2Id: ID!) {
			connectSpaces(space1Id: $space1Id, space2Id: $space2Id)
		}
	`;

	const { connectSpaces } = await graphqlRequest(query, { space1Id, space2Id });
	return connectSpaces;
}

export async function disconnectSpaces(space1Id: string, space2Id: string) {
	const query = `
		mutation DisconnectSpaces($space1Id: ID!, $space2Id: ID!) {
			disconnectSpaces(space1Id: $space1Id, space2Id: $space2Id)
		}
	`;

	const { disconnectSpaces } = await graphqlRequest(query, {
		space1Id,
		space2Id,
	});
	return disconnectSpaces;
}

export async function updateSpace(space: SpaceInput) {
	const query = `
		mutation UpdateSpace($space: SpaceInput!) {
			updateSpace(space: $space) {
				id
			}
		}
	`;

	const { updateSpace } = await graphqlRequest(query, {
		space,
	});
	return updateSpace;
}

async function graphqlRequest(query: any, variables: any = {}) {
	const request: RequestInit = {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer test`,
		},
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
