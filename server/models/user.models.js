import { model, Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 15,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 15,
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
    maxLength: 18,
    trim: true,
    required: true,
  },
});

const User = model("User", userSchema);
export default User;
