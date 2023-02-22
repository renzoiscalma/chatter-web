import { gql } from "apollo-server-core";

const UserListResponse = gql`
  type UserListResponse {
    code: Int!
    success: Boolean!
    data: [User]
  }
`;

export default UserListResponse;
