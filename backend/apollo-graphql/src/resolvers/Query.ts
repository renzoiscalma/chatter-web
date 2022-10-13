import { Types } from "mongoose";
import MessageCollection from "../db/interface/MessageSchema";
import { GetMessageOnLobbyResponse } from "../models/GetMessagesOnLobbyResponse";

interface getMessagesOnLobbyArgs {
  lobbyId: string;
}

export const queryResolver = {
  Query: {
    // todo apply types when done https://stackoverflow.com/a/67886925/20052351
    getMessagesOnLobby: async (
      _: any,
      args: getMessagesOnLobbyArgs,
      ___: any,
      ____: any
    ): Promise<GetMessageOnLobbyResponse> => {
      const res = await MessageCollection.find({
        to: new Types.ObjectId(args.lobbyId),
      }).populate("from to");
      return res.length
        ? {
            code: 200,
            success: true,
            data: res,
          }
        : {
            code: 404,
            success: false,
            data: [],
          };
    },
  },
};
