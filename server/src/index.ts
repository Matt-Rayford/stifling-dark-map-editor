import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import fs from 'fs';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import http from 'http';
import dotenv from 'dotenv';

import { resolvers } from './resolvers';
import { initDBCache } from './utils/cache';

dotenv.config();

const connectionString = process.env.DB_CONNECTION_URL;
export const pool = new Pool({
	connectionString,
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 9000;

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
	typeDefs: `${fs.readFileSync('./src/schema.graphql', { encoding: 'utf8' })}`,
	resolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startExpressServer = async () => {
	await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
	console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
};

const startApolloServer = async () => {
	console.log('Start server!');
	await startStandaloneServer(server)
	app.use(
		cors<cors.CorsRequest>({
			credentials: true,
			origin: [
				'http://localhost:3000',
				'https://thestiflingdark.com',
				'https://www.thestiflingdark.com',
				'https://stifling-dark-map-editor.vercel.app',
			],
		}),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
				const authString = req.headers.authorization;
				const authToken = authString?.split('Bearer ')?.[1];
				return { token: authToken };
			},
		}),
		bodyParser.json()
	);
};



try {
	startExpressServer();
	startApolloServer().then(() => {
		initDBCache();
	});
} catch (e) {
	console.log('ERROR | Starting Server: ', e);
}
