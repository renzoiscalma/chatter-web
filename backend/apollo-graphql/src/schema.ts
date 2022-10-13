import User from "./types/User";
import Message from "./types/Message";
import Lobby from "./types/Lobby";
import Query from "./types/Query";
import { queryResolver } from "./resolvers/Query";
import { makeExecutableSchema } from "@graphql-tools/schema";
import mutationResolver from "./resolvers/Mutation";
import Mutations from "./types/Mutations";
import AddMessageResponse from "./types/responses/AddMessageResponse";
import GetMessagesOnLobbyResponse from "./types/responses/GetMessageOnLobbyResponse";
import Subscription from "./types/Subscription";
import subResolver from "./resolvers/Subscription";
import AddMessageTopicResponse from "./types/responses/AddMessageTopicResponse";
import GenericResponse from "./types/responses/GenericResponse";
import AddNewUserResponse from "./types/responses/AddNewUserResponse";

export default makeExecutableSchema({
  typeDefs: [
    Subscription,
    Mutations,
    Query,
    User,
    Message,
    Lobby,
    AddNewUserResponse,
    AddMessageResponse,
    GetMessagesOnLobbyResponse,
    AddMessageTopicResponse,
    GenericResponse,
  ],
  resolvers: [subResolver, mutationResolver, queryResolver],
});
