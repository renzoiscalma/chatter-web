import { gql } from "apollo-server-core";

const VideoStatus = gql`
  type VideoStatus {
    status: Int!
    currTime: Int
    url: String
  }
`;

export default VideoStatus;
