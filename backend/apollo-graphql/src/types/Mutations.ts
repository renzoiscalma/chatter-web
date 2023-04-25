import { gql } from "apollo-server-core";

const Mutations = gql`
  type Mutation {
    addMessage(addMessageInput: AddMessageInput): AddMessageResponse
    addNewUser: AddNewUserResponse
    changeUsername(userId: ID, newUsername: String): GenericResponse
    createLobby(videoUrl: String): Lobby
    addUserToLobby(lobbyId: ID!, userId: ID!): GenericResponse
    removeUserToLobby(lobbyId: ID!, userId: ID!): GenericResponse
    updateVideoStatus(statusInput: VideoStatusInput): GenericResponse
    validateUsername(username: String!): ValidateUsernameResponse
  }
`;

export default Mutations;
