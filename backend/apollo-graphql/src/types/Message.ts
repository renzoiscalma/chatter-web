import { gql } from "apollo-server-core";

const Message = gql`
  type Message {
    id: ID!
    from: User
    to: Lobby
    message: String
    date: String
  }
`;

export default Message;
