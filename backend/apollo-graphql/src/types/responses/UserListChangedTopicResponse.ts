import { gql } from "apollo-server-core";

const UserListChangedTopicResponse = gql`
  type UserListChangedTopicResponse {
    code: Int!
    users: [User]
  }
`;

export default UserListChangedTopicResponse;
