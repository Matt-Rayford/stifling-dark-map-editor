const endpointURL = 'http://localhost:9000/graphql';

export async function createMap(title) {
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

export async function updateMap(id, spaceData, drawOptions) {
	const mutation = `
    mutation UpdateMap($id: ID, $spaceData: Object, $drawOptions: Object) {
      map: updateMap(mapId: $id, spaceData: $spaceData, drawOptions: $drawOptions) {
        id
        title
				drawOptions {
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
		drawOptions,
	});
	return map;
}

export async function updateMapSettings(id, drawOptions) {
	const mutation = `
    mutation UpdateMapSettings($id: ID, $drawOptions: Object) {
      map: updateMapSettings(mapId: $id, drawOptions: $drawOptions) {
				drawOptions {
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
	const { map } = await graphqlRequest(mutation, { id, drawOptions });
	return map;
}

export async function loadMap(id) {
	const query = `
		query LoadMap($id: ID!) {
			map(id: $id) {
				id
				title
				drawOptions {
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

export async function loadMaps() {
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

export async function updateMapSpaceGroup(mapId, group) {
	const query = `
    mutation UpdateMapSpaceGroup($mapId: ID!, $group: Object) {
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

export async function addMapSpaceGroup(mapId, group) {
	const query = `
    mutation AddMapSpaceGroup($mapId: ID!, $group: Object) {
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

export async function deleteMapSpaceGroup(mapId, groupId) {
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

async function graphqlRequest(query, variables = {}) {
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
			.map((error) => error.message)
			.join('\n');
		throw new Error(message);
	}
	return responseBody.data;
}
