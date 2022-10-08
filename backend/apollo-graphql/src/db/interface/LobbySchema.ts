import mongoose, { Schema } from "mongoose";
import { Lobby } from "../../models/Lobby";

export const LobbySchema = new Schema<Lobby>({
	currentUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
	video: Schema.Types.String
});

const LobbyCollection = mongoose.model<Lobby>('Lobby', LobbySchema);

export default LobbyCollection;