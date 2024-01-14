require('dotenv').config();
const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./db');
const { auth } = require('express-oauth2-jwt-bearer');
const { Client, Pool } = require('pg');

const port = process.env.PORT ?? 9000;
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const connectionString = process.env.DB_CONNECTION_URL;

const pool = new Pool({
	connectionString,
});

const client = new Client({
	connectionString,
});

module.exports = { pool, client };

/*
if (!process.env.OAUTH_DOMAIN || !process.env.OAUTH_AUDIENCE_URL) {
	console.log(
		'Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values'
	);

	process.exit();
}


const checkJwt = auth({
	audience: process.env.OAUTH_AUDIENCE_URL,
	issuerBaseURL: `https://${process.env.OAUTH_DOMAIN}/`,
	algorithms: ['RS256'],
});
*/

const app = express();
app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'https://thestiflingdark.com',
			'https://www.thestiflingdark.com',
			'https://stifling-dark-map-editor.vercel.app',
		],
	}),
	bodyParser.json(),
	expressJwt({
		secret: jwtSecret,
		credentialsRequired: false,
	})
);

const typeDefs = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf8' }));
const resolvers = require('./resolvers');
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

/*
app.get('/api/external', checkJwt, (req, res) => {
	res.send({
		msg: 'Your access token was successfully validated!',
	});
});
*/

app.listen(port, '0.0.0.0', () =>
	console.info(`Server started on port ${port}`)
);
