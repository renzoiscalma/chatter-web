import schema from "./schema";
import { ApolloServer } from "apollo-server";
import dotenv from 'dotenv';
import connectMongoose from "./db/connect";
import MessageCollection from "./db/interface/MessageSchema";
import LobbyCollection from "./db/interface/LobbySchema";
import UserCollection from "./db/interface/UserSchema";

dotenv.config();

connectMongoose().then(() => {
	// not really sure why I should be running these once...
	const userCollection = UserCollection;
	const messageCollection = MessageCollection;
	const lobbyCollection = LobbyCollection;
});

const server = new ApolloServer({
	schema,
});

server.listen(4000).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});



