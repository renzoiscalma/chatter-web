import { gql } from "apollo-server-core";

const GenericResponse = gql`
  type GenericResponse {
    code: Int!
    success: Boolean!
  }
`;

export default GenericResponse;
