import mongoose, { Schema } from "mongoose";
import { Message } from "../../models/Message";

export const MessageSchema = new Schema<Message>({
  from: { type: Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: Schema.Types.ObjectId, ref: "Lobby", required: true },
  message: { type: Schema.Types.String, required: true },
  date: { type: Schema.Types.Date, required: true },
});

const MessageCollection = mongoose.model<Message>("Message", MessageSchema);

export default MessageCollection;
