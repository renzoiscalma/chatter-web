import dotenv from 'dotenv';

import connectMongoose from "./db/connect";

import MessageCollection from "./db/interface/MessageSchema";
import LobbyCollection from "./db/interface/LobbySchema";
import UserCollection from "./db/interface/UserSchema";
import startApolloServer from './apollo';

import startRedisServer from './redis';

dotenv.config();

connectMongoose().then(() => {
	// not really sure why I should be running these once...
	const userCollection = UserCollection;
	const messageCollection = MessageCollection;
	const lobbyCollection = LobbyCollection;
});

startApolloServer();

startRedisServer();

