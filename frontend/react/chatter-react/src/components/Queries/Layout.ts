import { gql } from "@apollo/client";

const GET_MESSAGES_ON_LOBBY = gql`
	query getMessagesOnLobby($lobbyId: ID!) {
		getMessagesOnLobby(lobbyId: $lobbyId) {
			id
			message
			date
			from {
				username
			}
		}
	}
`

export {
	GET_MESSAGES_ON_LOBBY
};