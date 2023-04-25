import { Document, PopulatedDoc, Types } from "mongoose";
import LobbyCollection from "../db/interface/LobbySchema";
import MessageCollection from "../db/interface/MessageSchema";
import UserCollection from "../db/interface/UserSchema";
import VideoCollection from "../db/interface/VideoSchema";
import { AddMessageResponse } from "../models/AddMessageResponse";
import { User } from "../models/User";
import { pubsub } from "../redis";
import { generateNewUser } from "../utils/NameGenerators";
import {
  MESSAGE_ADDED_TOPIC,
  USERNAME_CHANGED_TOPIC,
  USER_LIST_UPDATED_TOPIC,
  VIDEO_STATUS_TOPIC,
} from "../utils/const";

interface AddMessageArgs {
  from: string;
  to: string;
  message: string;
  localDateSent: string;
}

interface UpdateVidStatus {
  lobbyId: string;
  userId: string;
  status: number;
  currTime: number;
  url: string;
}

interface ChangeUsernameArgs {
  lobbyId: string;
  userId: string;
  newUsername: string;
}

const mutationResolver = {
  Mutation: {
    // todo apply types when done https://stackoverflow.com/a/67886925/20052351
    // apply errors https://stackoverflow.com/questions/63402084/how-can-i-get-specific-error-messages-from-a-mongoose-schema
    addMessage: async (
      _: any,
      args: { addMessageInput: AddMessageArgs }
    ): Promise<AddMessageResponse> => {
      const { from, to, message, localDateSent } = args.addMessageInput;
      // date is created here, once it has arrived in backend, probably add middlewares
      // TODO check if lobby and user is existing...
      // TODO use await only or use .then() only https://stackoverflow.com/questions/50905750/error-handling-in-async-await
      const newMessage = new MessageCollection({
        message: message,
        to: new Types.ObjectId(to),
        from: new Types.ObjectId(from),
        date: new Date(),
      });

      await newMessage.save().catch((err) => {
        // todo have a proper middleware for catching errrors
        console.error(err);
        return undefined;
      });

      await newMessage.populate([
        "from",
        {
          path: "to",
          populate: { path: "currentUsers" },
        },
      ]);
      // use lobby params for efficiency
      await pubsub.publish(MESSAGE_ADDED_TOPIC, {
        messageAdded: {
          lobbyId: newMessage.get("to")?._id,
          messages: [newMessage].map((newMessage) =>
            newMessage.toJSON({ virtuals: true })
          ), // TODO replace newMessage in the future
        },
      });

      return newMessage
        ? {
            code: 200,
            success: true,
            message: newMessage,
            localDateSent,
          }
        : {
            code: 404,
            success: false,
            message: newMessage,
            localDateSent,
          };
    },
    addNewUser: async () => {
      const id = new Types.ObjectId();
      const generatedUsername = generateNewUser(id.toString());
      const newUser: Document = new UserCollection({
        _id: id,
        username: generatedUsername,
        type: 2,
      });
      await newUser.save().catch((err) => {
        console.error("addNewUser Err", err);
        return undefined;
      });

      return {
        code: newUser ? 200 : 500,
        success: newUser ? true : false,
        user: newUser,
      };
    },
    changeUsername: async (_: undefined, args: ChangeUsernameArgs) => {
      const filter = { _id: args.userId };
      const update = { $set: { username: args.newUsername } };
      await UserCollection.findOneAndUpdate(filter, update, {
        new: true,
      });

      const lobbyFilter = { currentUsers: args.userId };
      const lobbyRes = await LobbyCollection.find(lobbyFilter);
      await pubsub.publish(USERNAME_CHANGED_TOPIC, {
        lobbyId: args.lobbyId,
        usernameChanged: {
          code: 200,
          success: true,
          data: {
            id: args.userId,
            username: args.newUsername,
          },
          lobbies: lobbyRes.map((lobby) => lobby.id), // TODO SCRAPE LOBBIES
        },
      });

      return {
        code: 200,
        success: true,
      };
    },
    addUserToLobby: async (_: any, args: any, ___: any, ____: any) => {
      if (!args.lobbyId || !args.userId) return;
      const filter = { _id: args.lobbyId };
      const update = { $addToSet: { currentUsers: args.userId } };
      const res = await LobbyCollection.findOneAndUpdate(filter, update, {
        new: true,
      })
        .populate("currentUsers")
        .catch((err) => {
          console.error("Add User Err", err);
          return null;
        });

      await pubsub.publish(USER_LIST_UPDATED_TOPIC, {
        lobbyId: args.lobbyId,
        userListChanged: {
          code: res ? 200 : 500,
          success: Boolean(res),
          data: res?.currentUsers.map((data: PopulatedDoc<User & Document>) =>
            data.toJSON({ virtuals: true })
          ),
        },
      });

      return {
        code: res ? 200 : 500,
        success: res ? true : false,
      };
    },
    removeUserToLobby: async (_: any, args: any, ___: any, ____: any) => {
      if (!args.lobbyId || !args.userId) return;
      const filter = { _id: args.lobbyId };
      const update = { $pullAll: { currentUsers: [args.userId] } };
      const res = await LobbyCollection.findOneAndUpdate(filter, update, {
        new: true,
      })
        .populate("currentUsers")
        .catch((err) => {
          console.error("RemoveUserToLobbyError", err, args);
          return null;
        });

      await pubsub.publish(USER_LIST_UPDATED_TOPIC, {
        lobbyId: args.lobbyId,
        userListChanged: {
          code: res ? 200 : 500,
          success: Boolean(res),
          data: res?.currentUsers.map((data: PopulatedDoc<User & Document>) =>
            data.toJSON({ virtuals: true })
          ),
        },
      });
      return {
        code: res ? 200 : 500,
        success: res ? true : false,
      };
    },
    createLobby: async (_: any, args: any, ___: any, ____: any) => {
      let newVideo = new VideoCollection({
        currTime: 0,
        status: 2,
        url: args.videoUrl,
      });
      newVideo = await newVideo.save();

      let newLobby = new LobbyCollection({
        currentUsers: [],
        video: args.videoUrl,
        videoStatus: newVideo,
      });

      newLobby = await newLobby.save();

      await pubsub.publish(VIDEO_STATUS_TOPIC, {
        videoStatusChanged: {
          code: newVideo ? 200 : 500, //todo to be changed
          success: !!newVideo,
          data: {
            currTime: newVideo.currTime,
            status: newVideo.status,
            lobbyId: newLobby.id,
            userId: "N/A",
          },
        },
      });

      return newLobby;
    },
    updateVideoStatus: async (
      _: any,
      { statusInput }: { statusInput: UpdateVidStatus },
      ___: any,
      ____: any
    ) => {
      const { currTime, lobbyId, status, url, userId } = statusInput;
      const lobby = await LobbyCollection.findById(lobbyId);
      const userDetails = await UserCollection.findById(userId);
      if (!lobby) return null;
      const videoStatusfilter = { _id: lobby.videoStatus };
      const videoStatusUpdate = {
        $set: {
          currTime,
          status,
          ...(!!url && { url }), // conditional prop
        },
      };
      const videoStatus = await VideoCollection.findOneAndUpdate(
        videoStatusfilter,
        videoStatusUpdate,
        {
          new: true,
        }
      );

      await pubsub.publish(VIDEO_STATUS_TOPIC, {
        videoStatusChanged: {
          code: videoStatus ? 200 : 500, //todo to be changed
          success: !!videoStatus,
          data: {
            ...statusInput,
            changedBy: userDetails?.username,
          },
        },
      });

      return {
        code: videoStatus ? 200 : 500, //todo to be changed
        success: !!videoStatus,
      };
    },
    validateUsername: async (
      _: any,
      { username }: { username: string },
      ___: any,
      ____: any
    ) => {
      if (!username) return null;
      let err = false,
        invalidUser = false;
      const usernameFilter = { username };
      if (username.length > 35) {
        invalidUser = true;
      }
      const user = await UserCollection.findOne(usernameFilter).catch((err) => {
        console.error("ValidateUsername Error!", err);
        err = true;
        return null;
      });
      return {
        code: err ? 500 : 200,
        success: err ? 500 : 200,
        valid: !Boolean(user) && !invalidUser,
      };
    },
  },
};

export default mutationResolver;
