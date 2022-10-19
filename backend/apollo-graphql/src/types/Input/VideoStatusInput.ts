import { gql } from "apollo-server-core";

const VideoStatusInput = gql`
  input VideoStatusInput {
    lobbyId: ID!
    userId: ID!
    videoStatus: Int
    currTime: String
  }
`;

export default VideoStatusInput;
