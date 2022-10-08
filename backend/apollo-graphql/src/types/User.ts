import { gql } from "apollo-server";

const User = gql`
	type User {
		id: ID!
		username: String!
		type: Int!
	}
`;

export default User;