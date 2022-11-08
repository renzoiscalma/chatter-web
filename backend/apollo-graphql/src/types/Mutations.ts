import { gql } from "apollo-server-core";

const Mutations = gql`
  type Mutation {
    # TODO Use Extends for GenericResponse
    addMessage(addMessageInput: AddMessageInput): AddMessageResponse
    addNewUser: AddNewUserResponse
    changeUsername(userId: ID, newUsername: String): GenericResponse
    createLobby: Lobby
    addUserToLobby(lobbyId: ID, userId: ID): GenericResponse
    removeUserToLobby(lobbyId: ID, userId: ID): GenericResponse
    updateVideoStatus(statusInput: VideoStatusInput): GenericResponse
  }
`;

export default Mutations;
