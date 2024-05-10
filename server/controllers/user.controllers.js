import User from "../models/user.models.js";
import Account from "../models/account.models.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerSchema = z.object({
  firstName: z.string().min(3).max(15).trim(),
  lastName: z.string().min(3).max(15).optional(),
  username: z.string().min(3).max(15).trim(),
  password: z.string().min(6).max(18).trim(),
});

const loginSchema = z.object({
  username: z.string().min(3).max(15).trim(),
  password: z.string().min(6).max(18).trim(),
});

const registerUser = async (req, res) => {
  const { body } = req;
  try {
    registerSchema.safeParse(body);

    const isUserExists = await User.findOne({ username: body.username });
    if (isUserExists) {
      return res.status(403).json({ message: "Username is already exists" });
    }
    bcrypt.hash(body.password, 12, async (err, hash) => {
      if (err) {
        return res.status(401).json({ message: "Cannot hashed password" });
      }
      const newUser = await User.create({
        ...body,
        password: hash,
      });
      await Account.create({
        userID: newUser._id,
        balance: (Math.random() * 10000 + 1).toFixed(2),
      });
      return res.status(201).json({ message: "Register successful", newUser });
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid input", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { body } = req;
  try {
    loginSchema.safeParse(body);
    const isUserExists = await User.findOne({ username: body.username });
    if (!isUserExists) {
      return res.status(403).json({ message: "Username is not exists" });
    }
    bcrypt.compare(body.password, isUserExists.password, (err, hash) => {
      if (err) {
        return res.status(403).json({ message: err.message });
      }
      const token = jwt.sign(
        {
          userID: isUserExists._id,
          username: isUserExists.username,
        },
        process.env.JWT_SECRET
      );
      isUserExists.password = undefined;
      return res.status(200).json({
        message: "logged in successfully",
        authToken: token,
        user: isUserExists,
      });
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid Input" });
  }
};

const editProfile = async (req, res) => {
  const userID = req.userID;
  const { firstName, lastName, password } = req.body;
  if (!firstName && !lastName && !password) {
    return res.status(200).json({ message: "All data is up to dated" });
  }
  if (password) {
    bcrypt.hash(password, 12, async (err, hash) => {
      if (err) {
        return res.status(401).json({ message: "Cannot hashed password" });
      }
      const newUser = await User.findByIdAndUpdate(userID, {
        password: hash,
      });
      return res.status(201).json({ message: "Register successful", newUser });
    });
  }
  const newUser = await User.findByIdAndUpdate(userID, {
    firstName,
    lastName,
  });
  return res.status(201).json({ message: "Register successful", newUser });
};

const searchUserProfile = async (req, res) => {
  const query = req.params.q || "";
  const user = await User.find({
    $or: [
      { firstName: { $regex: query, $options: "i" } },
      { username: { $regex: query, $options: "i" } },
    ],
  })
    .limit(10)
    .select("-password");
  return res.status(200).json(user);
};

export { registerUser, loginUser, editProfile, searchUserProfile };
