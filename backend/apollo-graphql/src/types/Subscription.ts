import { gql } from "apollo-server-express";

const Subscription = gql`
  type Subscription {
    messageAdded(lobbyId: ID!, userId: ID!): AddMessageTopicResponse
    videoStatusChanged(lobbyId: ID!, userId: ID!): VideoStatusTopicResponse
    usernameChanged(lobbyId: ID!, userId: ID!): UsernameChangedTopicResponse
    userListChanged(lobbyId: ID!, userId: ID): UserListResponse
  }
`;

export default Subscription;
