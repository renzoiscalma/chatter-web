import { gql } from "apollo-server-core";

const VideoStatusTopicResponse = gql`
  type VideoStatusTopicResponse {
    code: Int!
    success: Boolean
    data: VideoStatus!
  }
`;

export default VideoStatusTopicResponse;
