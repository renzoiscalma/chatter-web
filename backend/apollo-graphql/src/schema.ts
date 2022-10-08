import User from "./types/User";
import Message from "./types/Message";
import Lobby from "./types/Lobby";
import Query from "./types/Query";
import { queryResolver } from "./resolvers/Query";
import { makeExecutableSchema } from "graphql-tools";
import mutationResolver from "./resolvers/Mutation";
import Mutations from "./types/Mutations";
import AddMessageResponse from "./types/responses/AddMessageResponse";
import GetMessagesOnLobbyResponse from "./types/responses/GetMessageOnLobbyResponse";

const schema = makeExecutableSchema({
	typeDefs: [
		Mutations,
		Query,
		User,
		Message,
		Lobby,
		AddMessageResponse,
		GetMessagesOnLobbyResponse,
	],
	resolvers: [
		mutationResolver,
		queryResolver
	]
})

export default schema;