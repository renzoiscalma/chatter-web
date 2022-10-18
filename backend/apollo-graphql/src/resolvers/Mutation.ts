import { Document, Types } from "mongoose";
import LobbyCollection from "../db/interface/LobbySchema";
import MessageCollection from "../db/interface/MessageSchema";
import UserCollection from "../db/interface/UserSchema";
import { AddMessageResponse } from "../models/AddMessageResponse";
import { pubsub } from "../redis";
import { MESSAGE_ADDED_TOPIC } from "../utils/const";
import { generateNewUser } from "../utils/NameGenerators";

interface addMessageArgs {
  from: string;
  to: string;
  message: string;
  localDateSent: string;
}

const mutationResolver = {
  Mutation: {
    // todo apply types when done https://stackoverflow.com/a/67886925/20052351
    // apply errors https://stackoverflow.com/questions/63402084/how-can-i-get-specific-error-messages-from-a-mongoose-schema
    addMessage: async (
      _: any,
      { from, to, message, localDateSent }: addMessageArgs
    ): Promise<AddMessageResponse> => {
      console.log(from, to, message, localDateSent);
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
        console.log(err);
        return null;
      });

      return {
        code: newUser ? 200 : 500,
        success: newUser ? true : false,
        user: newUser,
      };
    },
    addUserToLobby: async (_: any, args: any, ___: any, ____: any) => {
      const filter = { _id: args.lobbyId };
      const update = { $push: { currentUsers: args.userId } };
      const res = await LobbyCollection.findOneAndUpdate(filter, update, {
        new: true,
      }).catch((err) => {
        console.log(err);
        return null;
      });
      console.log(await res?.populate("currentUsers"));
      return {
        code: res ? 200 : 500,
        success: res ? true : false,
      };
    },
    removeUserToLobby: async (_: any, args: any, ___: any, ____: any) => {
      const filter = { _id: args.lobbyId };
      const update = { $pullAll: { currentUsers: [args.userId] } };
      const res = await LobbyCollection.findOneAndUpdate(filter, update, {
        new: true,
      }).catch((err) => {
        console.log(err);
        return null;
      });
      console.log(await res?.populate("currentUsers"));
      return {
        code: res ? 200 : 500,
        success: res ? true : false,
      };
    },
    createLobby: async (_: any, args: any, ___: any, ____: any) => {
      const newLobby = new LobbyCollection({
        currentUsers: [],
        video: "",
      });
      return await newLobby.save();
    },
  },
};

export default mutationResolver;
