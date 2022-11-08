import { gql } from "@apollo/client";

export const CHANGE_USERNAME = gql`
  mutation changeUsername($newUsername: String, $userId: ID) {
    changeUsername(newUsername: $newUsername, userId: $userId) {
      code
      success
    }
  }
`;
