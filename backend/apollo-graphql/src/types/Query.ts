import { gql } from "apollo-server-core";

const Query = gql`
  type Query {
    getUser(id: ID!): User
    getLobby(id: ID!): Lobby
    getMessage(id: ID!): Message
    getMessagesOnLobby(lobbyId: ID!): GetMessagesOnLobbyResponse
  }
`;

export default Query;
