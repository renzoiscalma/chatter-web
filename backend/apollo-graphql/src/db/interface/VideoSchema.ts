import mongoose, { Schema } from "mongoose";

export const VideoSchema = new Schema<VideoStatus>({
  status: Schema.Types.Number,
  currTime: Schema.Types.String,
});

const VideoCollection = mongoose.model<VideoStatus>("VideoStatus", VideoSchema);

export default VideoCollection;
