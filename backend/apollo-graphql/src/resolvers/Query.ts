import { Types } from "mongoose";
import LobbyCollection from "../db/interface/LobbySchema";
import MessageCollection from "../db/interface/MessageSchema";
import VideoCollection from "../db/interface/VideoSchema";
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
    isLobbyExisting: async (
      // todo appy proper types
      _: any,
      args: any,
      ___: any,
      ____: any
    ): Promise<any> => {
      const res = await LobbyCollection.findById(
        new Types.ObjectId(args.lobbyId)
      );
      console.log(res);
      return res // error handling in the future TODO
        ? {
            code: 200,
            success: true,
            isExisting: true,
          }
        : {
            code: 200,
            success: false,
            isExisting: false,
          };
    },
    getVideoStatusOnLobby: async (_: any, { lobbyId }: any) => {
      const res = await LobbyCollection.findById(lobbyId);
      await res?.populate("videoStatus");
      return {
        code: res ? 200 : 500,
        success: !!res,
        data: res?.videoStatus,
      };
    },
  },
};
