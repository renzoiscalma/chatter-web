import { gql } from "apollo-server-core";

const ValidateUsernameResponse = gql`
  type ValidateUsernameResponse {
    code: Int
    success: Boolean
    valid: Boolean
  }
`;

export default ValidateUsernameResponse;
