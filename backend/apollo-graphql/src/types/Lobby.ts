import { gql } from 'apollo-server';

const Lobby = gql`
	type Lobby {
		id: ID!
		currentUsers: [User]
		video: String
	}
`;

export default Lobby;