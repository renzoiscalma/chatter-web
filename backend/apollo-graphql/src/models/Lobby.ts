import { Types } from "mongoose";

export interface Lobby {
  currentUsers: [{ _id: Types.ObjectId }];
  video: string;
  videoStatus: Types.ObjectId;
}
