import { gql } from "apollo-server-core";

const UsernameChangedTopicResponse = gql`
  type UsernameChangedTopicResponse {
    code: Int!
    success: Boolean
    data: User
  }
`;

export default UsernameChangedTopicResponse;
