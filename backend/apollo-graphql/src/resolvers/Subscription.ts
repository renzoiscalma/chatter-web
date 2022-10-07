import { gql } from 'apollo-server-core';
import { pubsub } from '../redis';
import { MESSAGE_ADDED_TOPIC } from '../utils/const';

const subResolver = {
	Subscription: {
		messageAdded: { // todo types
			subscribe: (_: undefined, args: any) => pubsub.asyncIterator(MESSAGE_ADDED_TOPIC)
		}
	}
}

export default subResolver;