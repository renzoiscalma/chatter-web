import { gql } from "@apollo/client";

export const ADD_NEW_USER = gql`
  mutation {
    addNewUser {
      code
      success
      user {
        id
        username
      }
    }
  }
`;
