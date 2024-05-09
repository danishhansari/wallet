import { z } from "zod";
import User from "../models/user.models.js";

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
  const newUser = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    username: body.username,
    password: body.password,
  });
  return res
    .status(200)
    .json({ message: "User created successfully", newUser });
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
  return res.status(200).json({ message: "User logged in successfully" });
};

export { registerUser, loginUser };
