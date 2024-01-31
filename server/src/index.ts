import { ApolloServer } from '@apollo/server';
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
	await server.start();
	app.use(
		cors<cors.CorsRequest>({
			origin: [
				'http://localhost:3000',
				'https://thestiflingdark.com',
				'https://www.thestiflingdark.com',
				'https://stifling-dark-map-editor.vercel.app',
			],
		}),
		express.json(),
		expressMiddleware(server),
		bodyParser.json()
		/*expressJwt({
		secret: jwtSecret,
		credentialsRequired: false,
		*/
	);
};

startExpressServer();
startApolloServer().then(() => {
	initDBCache();
});
