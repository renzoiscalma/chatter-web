import { gql } from "apollo-server-core";

const AddMessageTopicResponse = gql`
  type AddMessageTopicResponse {
    lobbyId: ID
    messages: [Message]
  }
`;

export default AddMessageTopicResponse;
