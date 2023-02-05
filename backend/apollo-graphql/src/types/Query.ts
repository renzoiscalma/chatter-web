import { gql } from "apollo-server-core";

const Query = gql`
  type Query {
    getUser(id: ID!): User
    getMessage(id: ID!): Message
    getMessagesOnLobby(lobbyId: ID!): GetMessagesOnLobbyResponse
    getCurrentUsersOnLobby(lobbyId: ID!): UserListResponse
    getVideoStatusOnLobby(lobbyId: ID!): VideoStatusTopicResponse
    isLobbyExisting(lobbyId: ID!): IsLobbyExistingResponse
  }
`;

export default Query;
