import { gql } from "apollo-server-core";

const AddMessageInput = gql`
  input AddMessageInput {
    from: ID
    to: ID
    message: String
    localDateSent: String
  }
`;

export default AddMessageInput;
