import { gql } from "apollo-server-core";

const Mutations = gql`
	type Mutation {
		addMessage(from: ID, to: ID, message: String, localDateSent: String): AddMessageResponse
		addUser(username: String): User
	}
`;

export default Mutations;