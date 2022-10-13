import { gql } from "apollo-server-core";
import { pubsub } from "../redis";
import { MESSAGE_ADDED_TOPIC } from "../utils/const";
import { withFilter } from "graphql-subscriptions";

const subResolver = {
  Subscription: {
    messageAdded: {
      // todo types
      subscribe: withFilter(
        (_: any, args: any) => {
          return pubsub.asyncIterator(MESSAGE_ADDED_TOPIC);
        },
        (payload: any, variables: any) => {
          console.log(
            "hey",
            payload.messageAdded,
            "zzz",
            payload.messageAdded.messages[0].from.id
          );
          console.log(
            payload.lobbyId,
            variables,
            typeof payload.lobbyId,
            typeof variables.lobbyId
          );
          return (
            payload.messageAdded.lobbyId === variables.lobbyId &&
            variables.userId !== payload.messageAdded.messages[0].from.id
          );
        }
      ),
      // subscribe: (_: any, args: any) => pubsub.asyncIterator(MESSAGE_ADDED_TOPIC)
    },
  },
};

export default subResolver;
