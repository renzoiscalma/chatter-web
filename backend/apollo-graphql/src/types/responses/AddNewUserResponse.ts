import { gql } from "apollo-server-core";

const AddNewUserResponse = gql`
  type AddNewUserResponse {
    code: Int!
    success: Boolean!
    user: User!
  }
`;

export default AddNewUserResponse;
