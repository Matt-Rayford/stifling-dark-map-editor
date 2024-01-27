import fs from 'fs';
import { ApolloServer, gql } from 'apollo-server';
import { resolvers } from './resolvers';

async function startApolloServer(resolvers) {
	const server = new ApolloServer({
		typeDefs: gql(fs.readFileSync('./schema.graphql', { encoding: 'utf8' })),
		resolvers,
	});

	const { url, port } = await server.listen({ url: '0.0.0.0', port: '4000' });
	console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(resolvers);
