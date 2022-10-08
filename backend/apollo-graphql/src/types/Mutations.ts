import { gql } from "apollo-server";

const Mutations = gql`
	type Mutation {
		addMessage(from: ID, to: ID, message: String): AddMessageResponse
		addUser(username: String): User
	}
`;

export default Mutations;