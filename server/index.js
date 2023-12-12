const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers');

async function startApolloServer(typeDefs, resolvers) {
	const server = new ApolloServer({
		typeDefs: gql(
			fs.readFileSync('./schema.graphql', { encoding: 'utf8' })
		),
		resolvers,
	});

	const { url, port } = await server.listen();
	console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);
