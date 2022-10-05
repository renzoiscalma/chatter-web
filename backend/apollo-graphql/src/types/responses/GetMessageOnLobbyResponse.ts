import { gql } from "apollo-server";

const GetMessagesOnLobbyResponse = gql`
	type GetMessagesOnLobbyResponse {
		code: Int!
		success: Boolean!
		data: [Message]
	}	
`;

export default GetMessagesOnLobbyResponse;