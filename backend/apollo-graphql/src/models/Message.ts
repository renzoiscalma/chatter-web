import { Types } from "mongoose";

export interface Message {
  from: Types.ObjectId;
  to: Types.ObjectId;
  message: string;
  date: Date;
}
