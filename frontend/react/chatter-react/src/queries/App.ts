import { gql } from "@apollo/client";

export const ADD_NEW_USER = gql`
  mutation {
    addNewUser {
      code
      success
      user {
        id
        username
      }
    }
  }
`;

export const IS_LOBBY_EXISTING = gql`
  query isLobbyExisting($lobbyId: ID!) {
    isLobbyExisting(lobbyId: $lobbyId) {
      code
      success
      isExisting
    }
  }
`;

export const CREATE_LOBBY = gql`
  mutation {
    createLobby {
      id
    }
  }
`;
