import { gql } from "apollo-server-core";
import { pubsub } from "../redis";
import { MESSAGE_ADDED_TOPIC, VIDEO_STATUS_TOPIC } from "../utils/const";
import { withFilter } from "graphql-subscriptions";

const subResolver = {
  Subscription: {
    messageAdded: {
      // todo types
      subscribe: withFilter(
        () => {
          return pubsub.asyncIterator(MESSAGE_ADDED_TOPIC);
        },
        (payload: any, variables: any) => {
          return (
            payload.messageAdded.lobbyId === variables.lobbyId &&
            variables.userId !== payload.messageAdded.messages[0].from.id
          );
        }
      ),
    },
    videoStatusChanged: {
      subscribe: withFilter(
        () => {
          return pubsub.asyncIterator(VIDEO_STATUS_TOPIC);
        },
        (payload: any, variables: any) => {
          return (
            payload.messageAdded.lobbyId === variables.lobbyId &&
            variables.userId !== payload.userId
          );
        }
      ),
    },
  },
};

export default subResolver;
