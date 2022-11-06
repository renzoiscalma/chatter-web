import { gql } from "apollo-server-core";

const VideoStatusInput = gql`
  input VideoStatusInput {
    lobbyId: ID!
    userId: ID!
    status: Int
    currTime: Int
    url: String
  }
`;

export default VideoStatusInput;
