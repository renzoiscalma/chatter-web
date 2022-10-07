import { gql } from 'apollo-server-express';

const Subscription = gql`
	type Subscription {
		messageAdded: [Message]
	} 
`;

export default Subscription;