import { z } from "zod";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

const registerSchema = z.object({
  firstName: z.string().min(3).max(15).trim(),
  lastName: z.string().min(3).max(15).optional(),
  username: z.string().min(3).max(15).trim(),
  password: z.string().min(6).max(18).trim(),
});

const registerUser = async (req, res) => {
  const body = req.body;
  const { success } = registerSchema.safeParse(body);
  if (!success) {
    console.log(success);
    return res.status(403).json({ message: "Invalid Input" });
  }
  // Checking user is already exist or not
  const user = await User.findOne({ username: body.username });
  if (user) {
    return res.status(401).json({ message: "Username is already exists" });
  }
  const newUser = await User.create(body);
  const token = jwt.sign(
    { userId: newUser._id, username: newUser.username },
    process.env.JWT_SECRET
  );
  return res
    .status(200)
    .json({ message: "User created successfully", newUser, token });
};

const loginSchema = z.object({
  username: z.string().min(3).max(15).trim(),
  password: z.string().min(6).max(18).trim(),
});

const loginUser = async (req, res) => {
  const body = req.body;
  const { success } = loginSchema.safeParse(body);
  if (!success) {
    return res.status(401).json({ message: "invalid input" });
  }
  const user = await User.findOne({ username: body.username });
  if (!user) {
    return res.status(401).json({ message: "Username is not exists" });
  }
  if (user.password !== body.password) {
    return res.status(403).json({ message: "Password is incorrect" });
  }
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET
  );
  return res
    .status(200)
    .json({ message: "User logged in successfully", token });
};

const editProfile = async (req, res) => {
  const userId = req.userId;
  const { firstName, lastName, password } = req.body;

  const userExist = await User.findOne({ _id: userId });
  userExist.firstName = firstName;
  userExist.lastName = lastName;
  userExist.password = password;

  userExist
    .save()
    .then((user) => {
      return res
        .status(201)
        .json({ message: "User updated successfully", user });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

const searchUserProfile = async (req, res) => {
  const query = req.params.q;
  const users = await User.find({
    $or: [
      { firstName: { $regex: query, $options: "i" } },
      { username: { $regex: query, $options: "i" } },
    ],
  }).select("-password");

  return res.status(200).json(users);
};

export { registerUser, loginUser, editProfile, searchUserProfile };
