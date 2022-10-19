import { gql } from "apollo-server-express";

const Subscription = gql`
  type Subscription {
    messageAdded(lobbyId: ID!, userId: ID!): AddMessageTopicResponse
    videoStatusChanged(lobbyId: ID!, userId: ID!): VideoStatusTopicResponse
  }
`;

export default Subscription;
