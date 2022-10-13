import { gql } from "apollo-server-core";

const Lobby = gql`
  type Lobby {
    id: ID!
    currentUsers: [User]
    video: String
  }
`;

export default Lobby;
