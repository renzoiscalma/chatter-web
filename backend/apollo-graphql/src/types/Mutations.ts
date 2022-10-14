import { gql } from "apollo-server-core";

const Mutations = gql`
  type Mutation {
    # TODO Use Extends for GenericResponse
    addMessage(
      from: ID
      to: ID
      message: String
      localDateSent: String
    ): AddMessageResponse
    addNewUser: AddNewUserResponse
    createLobby: Lobby
    addUserToLobby(lobbyId: ID, userId: ID): GenericResponse
    removeUserToLobby(lobbyId: ID, userId: ID): GenericResponse
  }
`;

export default Mutations;
