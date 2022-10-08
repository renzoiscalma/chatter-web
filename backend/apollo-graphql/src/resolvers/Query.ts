import { GraphQLResolveInfo } from "graphql";
import mongoose, { Types } from "mongoose";
import MessageCollection from "../db/interface/MessageSchema";

interface getMessagesOnLobbyArgs {
	lobbyId: string
}

export const queryResolver = {
	Query: {
		// todo apply types when done https://stackoverflow.com/a/67886925/20052351
		getMessagesOnLobby: async (_: any, args: getMessagesOnLobbyArgs, ___: any, ____: any) => {
			return await MessageCollection.find({to: new Types.ObjectId(args.lobbyId)}).populate('from');
		}
	}
}
