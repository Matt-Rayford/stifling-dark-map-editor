const endpointURL = 'http://localhost:9000/graphql';

async function createMap(title) {
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

async function updateMap(id, mapData) {
	const mutation = `
			mutation UpdateMap($id: ID, $mapData: Object) {
				map: updateMap(mapId: $id, mapData: $mapData){
					id
					title
					spaces {
						id
						number
						type
						lightLevel
						connections
					}
				}
			}
    `;
	const { map } = await graphqlRequest(mutation, { id, mapData });
	return map;
}

async function loadMapFromDb(id) {
	const query = `
		query LoadMap($id: ID!) {
			map(id: $id) {
				id
				title
				spaces {
          id
					number
				  type
          lightLevel
          row
          col
				  connections
				}
			}
		}
	`;
	const { map } = await graphqlRequest(query, { id });
	return map;
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
