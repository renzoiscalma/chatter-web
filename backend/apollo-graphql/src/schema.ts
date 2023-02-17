import { makeExecutableSchema } from "@graphql-tools/schema";
import mutationResolver from "./resolvers/Mutation";
import { queryResolver } from "./resolvers/Query";
import subResolver from "./resolvers/Subscription";
import AddMessageInput from "./types/Input/AddMessageInput";
import VideoStatusInput from "./types/Input/VideoStatusInput";
import Lobby from "./types/Lobby";
import Message from "./types/Message";
import Mutations from "./types/Mutations";
import Query from "./types/Query";
import AddMessageResponse from "./types/responses/AddMessageResponse";
import AddMessageTopicResponse from "./types/responses/AddMessageTopicResponse";
import AddNewUserResponse from "./types/responses/AddNewUserResponse";
import GenericResponse from "./types/responses/GenericResponse";
import GetMessagesOnLobbyResponse from "./types/responses/GetMessageOnLobbyResponse";
import IsLobbyExistingResponse from "./types/responses/IsLobbyExistingResponse";
import UserListResponse from "./types/responses/UserListResponse";
import UsernameChangedTopicResponse from "./types/responses/UsernameChangedTopicResponse";
import ValidateUsernameResponse from "./types/responses/ValidateUsernameResponse";
import VideoStatusTopicResponse from "./types/responses/VideoStatusTopicResponse";
import Subscription from "./types/Subscription";
import User from "./types/User";
import VideoStatus from "./types/VideoStatus";

export default makeExecutableSchema({
  typeDefs: [
    Subscription,
    Mutations,
    Query,
    User,
    Message,
    Lobby,
    VideoStatus,
    VideoStatusInput,
    AddMessageInput,
    AddNewUserResponse,
    AddMessageResponse,
    GetMessagesOnLobbyResponse,
    AddMessageTopicResponse,
    IsLobbyExistingResponse,
    VideoStatusTopicResponse,
    UsernameChangedTopicResponse,
    UserListResponse,
    GenericResponse,
    ValidateUsernameResponse,
  ],
  resolvers: [subResolver, mutationResolver, queryResolver],
});
