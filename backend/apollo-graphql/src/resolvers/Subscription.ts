import { withFilter } from "graphql-subscriptions";
import { pubsub } from "../redis";
import {
  MESSAGE_ADDED_TOPIC,
  USERNAME_CHANGED_TOPIC,
  USER_LIST_UPDATED_TOPIC,
  VIDEO_STATUS_TOPIC,
} from "../utils/const";

interface TopicVariables {
  lobbyId: string;
  userId: string;
}

const subResolver = {
  Subscription: {
    messageAdded: {
      // todo types
      subscribe: withFilter(
        () => {
          return pubsub.asyncIterator(MESSAGE_ADDED_TOPIC);
        },
        (payload: any, variables: TopicVariables) => {
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
        (payload: any, variables: TopicVariables) => {
          if (Boolean(payload.videoStatusChanged.data.url)) return true;
          return (
            payload.videoStatusChanged.data.lobbyId === variables.lobbyId &&
            payload.videoStatusChanged.data.userId !== variables.userId
          );
        }
      ),
    },
    usernameChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(USERNAME_CHANGED_TOPIC),
        (payload: any, variables: TopicVariables) => {
          return payload.usernameChanged.lobbies.includes(variables.lobbyId);
        }
      ),
    },
    userListChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(USER_LIST_UPDATED_TOPIC),
        (payload: any, { lobbyId }: TopicVariables) => {
          return payload.lobbyId === lobbyId;
        }
      ),
    },
  },
};

export default subResolver;
