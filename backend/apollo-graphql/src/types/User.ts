import { gql } from "apollo-server-core";

const User = gql`
  type User {
    id: ID!
    username: String!
    type: Int
  }
`;

export default User;
