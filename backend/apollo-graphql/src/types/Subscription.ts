import { gql } from "apollo-server-express";

const Subscription = gql`
  type Subscription {
    messageAdded(lobbyId: ID!, userId: ID!): AddMessageTopicResponse
    videoStatusChanged(
      lobbyId: ID!
      videoStatus: VideoStatus!
    ): VideoStatusTopicResponse
  }
`;

export default Subscription;
