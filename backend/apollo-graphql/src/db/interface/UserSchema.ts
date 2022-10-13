import mongoose, { Schema } from "mongoose";
import { User } from "../../models/User";

export const UserSchema = new Schema<User>({
  username: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  type: Schema.Types.Number,
});

const UserCollection = mongoose.model<User>("User", UserSchema);

export default UserCollection;
