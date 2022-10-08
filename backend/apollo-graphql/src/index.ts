import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';

import connectMongoose from "./db/connect";

import schema from "./schema";
import MessageCollection from "./db/interface/MessageSchema";
import LobbyCollection from "./db/interface/LobbySchema";
import UserCollection from "./db/interface/UserSchema";

dotenv.config();

async function startApolloServer() { // place to another file.
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		schema,
		csrfPrevention: true,
		cache: 'bounded',
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }), // read documentation
			ApolloServerPluginLandingPageLocalDefault({embed: true}),
 		]
	})

	await server.start()
	server.applyMiddleware({
		app,
		path: '/'
	})

	await new Promise<void>(resolve => httpServer.listen({port: 4000}, resolve));
	console.log(`🚀  Server ready at ${4000}`); // change to ${4000} url

}

connectMongoose().then(() => {
	// not really sure why I should be running these once...
	const userCollection = UserCollection;
	const messageCollection = MessageCollection;
	const lobbyCollection = LobbyCollection;
});

// const server = new ApolloServer({
// 	schema,
// });

startApolloServer();

