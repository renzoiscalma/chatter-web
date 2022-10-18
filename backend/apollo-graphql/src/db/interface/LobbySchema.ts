import mongoose, { Schema } from "mongoose";
import { Lobby } from "../../models/Lobby";

export const LobbySchema = new Schema<Lobby>({
  currentUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  video: Schema.Types.String,
  videoStatus: { type: Schema.Types.ObjectId, ref: "VideoStatus" },
});

const LobbyCollection = mongoose.model<Lobby>("Lobby", LobbySchema);

export default LobbyCollection;
