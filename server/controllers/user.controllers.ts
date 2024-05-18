import User from "../models/user.models.js";
import Account from "../models/account.models.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface UserRequestBody {
  name: string;
  username: string;
  password: string;
}

interface LoginRequestBody {
  username: string;
  password: string;
}

const registerSchema = z.object({
  name: z.string().min(3).max(15).trim(),
  username: z.string().min(3).max(15).trim(),
  password: z.string().min(6).max(18).trim(),
});

const loginSchema = z.object({
  username: z.string().min(3).max(15).trim(),
  password: z.string().min(6).max(18).trim(),
});

const registerUser = async (
  req: Request<any, any, UserRequestBody>,
  res: Response
) => {
  const { body } = req;
  try {
    registerSchema.safeParse(body);

    const isUserExists = await User.findOne({ username: body.username });
    if (isUserExists) {
      return res.status(403).json({ message: "Username is already exists" });
    }
    const hashedPassword = await bcrypt.hash(body.password, 12);
    const newUser = await User.create({
      ...body,
      password: hashedPassword,
    });
    await Account.create({
      userID: newUser._id,
      balance: (Math.random() * 10000 + 1).toFixed(2),
    });
    return res
      .status(201)
      .json({ message: "Registration successful", newUser });
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: "Invalid input", error: error.message });
  }
};

const loginUser = async (
  req: Request<any, any, LoginRequestBody>,
  res: Response
) => {
  const { body } = req;
  try {
    loginSchema.safeParse(body);
    const isUserExists = await User.findOne({ username: body.username });
    if (!isUserExists) {
      return res.status(403).json({ message: "Username is not exists" });
    }
    const isPasswordValid = await bcrypt.compare(
      body.password,
      isUserExists.password
    );
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      {
        userID: isUserExists._id,
        username: isUserExists.username,
      },
      process.env.JWT_SECRET || ""
    );
    return res.status(200).json({
      message: "logged in successfully",
      authToken: token,
      user: isUserExists,
    });
  } catch (error: any) {
    return res.status(403).json({ message: "Invalid Input" });
  }
};

const editProfile = async (
  req: Request<
    {},
    {},
    { name?: string; password?: string },
    { userID?: string }
  >,
  res: Response
) => {
  const userID = (req as any).userID;
  const { name, password } = req.body;
  if (!name && !password) {
    return res.status(200).json({ message: "All data is up to dated" });
  }
  try {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.findByIdAndUpdate(userID, {
        password: hashedPassword,
      });
      return res
        .status(201)
        .json({ message: "Profile updated successfully", newUser });
    } else {
      const newUser = await User.findByIdAndUpdate(
        userID,
        {
          name,
        },
        { new: true }
      );
      return res
        .status(201)
        .json({ message: "Profile updated successfully", newUser });
    }
  } catch (err: any) {
    return res
      .status(400)
      .json({ message: "Error updating profile", error: err.message });
  }
};

const searchUserProfile = async (req: Request, res: Response) => {
  const { query } = req.body || "";
  console.log(query);

  const users = await User.find({
    $or: [
      { firstName: { $regex: query, $options: "i" } },
      { username: { $regex: query, $options: "i" } },
    ],
  })
    .select("-password")
    .lean();
  return res.status(200).json(users);
};

const getCurrentUser = async (
  req: Request<{}, {}, { userID?: string }>,
  res: Response
) => {
  const userID = (req as any).userID;

  try {
    const user = await User.findById(userID).select("-password").lean();
    return res.status(200).json(user);
  } catch (err: any) {
    return res
      .status(400)
      .json({ message: "Error fetching user", error: err.message });
  }
};

export {
  registerUser,
  loginUser,
  editProfile,
  searchUserProfile,
  getCurrentUser,
};
