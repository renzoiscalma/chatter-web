import { gql } from 'apollo-server-express';

const Subscription = gql`
	type Subscription {
		messageAdded(lobbyId: ID!): AddMessageTopicResponse
	} 
`;

export default Subscription;