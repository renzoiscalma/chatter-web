import { gql } from "apollo-server-core";

const IsLobbyExistingResponse = gql`
  type IsLobbyExistingResponse {
    code: Int!
    success: Boolean
    isExisting: Boolean
  }
`;

export default IsLobbyExistingResponse;
