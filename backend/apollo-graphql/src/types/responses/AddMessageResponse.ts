import { gql } from "apollo-server-core";

const AddMessageResponse = gql`
  type AddMessageResponse {
    code: Int!
    success: Boolean!
    message: Message
    localDateSent: String
  }
`;

export default AddMessageResponse;
