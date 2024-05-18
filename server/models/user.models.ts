import { model, Schema, Document } from "mongoose";

interface UserAttribute {
  name: string;
  username: string;
  password: string;
}

interface UserDocument extends UserAttribute, Document {}
const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 15,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      minLength: 3,
      maxLength: 15,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minLength: 6,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model<UserDocument>("User", userSchema);
export default User;
