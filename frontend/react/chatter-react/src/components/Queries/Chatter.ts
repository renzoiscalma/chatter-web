import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
	mutation($to: ID, $from: ID, $message: String, $localDateSent: String) {
		addMessage(to: $to, from: $from, message: $message, localDateSent: $localDateSent) {
			code
			success
			localDateSent
			message {
				message
				from {
					username
					id
				}
				to {
					id 
				}
			}
		}
	}
`;

export const GET_MESSAGES_ON_LOBBY = gql`
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

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
	subscription MessageAdded($lobbyId: ID!, $userId: ID!) {
		messageAdded(lobbyId: $lobbyId, userId: $userId) {
			lobbyId
			messages {
				from {
					id
					username
					type
				}
				message
				date
			}
		}
	}
`; 