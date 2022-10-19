import { gql } from "apollo-server-core";

const VideoStatus = gql`
  type VideoStatus {
    status: Int!
    currTime: String
  }
`;

export default VideoStatus;
