import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import schema from "./schema";

async function startApolloServer() { // type is GraphQLSchema but isn't working
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
	console.log(`🚀  Server ready at ${process.env.LOCAL}`); 
}

export default startApolloServer;