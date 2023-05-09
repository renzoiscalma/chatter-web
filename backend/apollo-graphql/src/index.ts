import dotenv from "dotenv";

import connectMongoose from "./db/connect";

import startApolloServer from "./apollo";
import LobbyCollection from "./db/interface/LobbySchema";
import MessageCollection from "./db/interface/MessageSchema";
import UserCollection from "./db/interface/UserSchema";

import VideoCollection from "./db/interface/VideoSchema";
import startRedisServer from "./redis";

dotenv.config();

connectMongoose().then(() => {
  // not really sure why I should be running these once...
  const userCollection = UserCollection;
  const messageCollection = MessageCollection;
  const lobbyCollection = LobbyCollection;
  const videoCollection = VideoCollection;
});

startApolloServer();

startRedisServer();
