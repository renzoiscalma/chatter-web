import { gql } from "apollo-server";

const Message = gql`
	type Message {
		id: ID!
		from: User
		to: Lobby
		message: String
		date: String
	}
`;

export default Message;