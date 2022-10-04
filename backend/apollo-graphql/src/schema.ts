import User from "./types/User";
import Message from "./types/Message";
import Lobby from "./types/Lobby";
import Query from "./types/Query";
import { queryResolver } from "./resolvers/Query";
import { makeExecutableSchema } from "graphql-tools";

const schema = makeExecutableSchema({
	typeDefs: [
		Query,
		User,
		Message,
		Lobby
	],
	resolvers: [
		queryResolver
	]
})

export default schema;