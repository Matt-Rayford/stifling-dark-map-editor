const fs = require('fs');
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const port = 9000;
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();
app.use(
	cors(),
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
// path defaults to '/graphql' but is nicer to call out explicitly
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen(port, () => console.info(`Server started on port ${port}`));
