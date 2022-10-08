import { gql } from "@apollo/client";

const SEND_MESSAGE = gql`
	mutation($to: ID, $from: ID, $message: String) {
		addMessage(to: $to, from: $from, message: $message) {
			code
			success
			message {
				message
				from {
					username
				}
				to {
					id 
				}
			}
		}
	}
`;

const GET_MESSAGES_ON_LOBBY = gql`
	query getMessagesOnLobby($lobbyId: ID!) {
		getMessagesOnLobby(lobbyId: $lobbyId) {
			code
			success
			data {
				id
				from {
					username
					id
				}
				message
				date
			}
		}
	}
`

export {
	GET_MESSAGES_ON_LOBBY,
	SEND_MESSAGE
};