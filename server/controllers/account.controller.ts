import Account from "../models/account.models.js";
import Transaction from "../models/transaction.models.js";
import mongoose from "mongoose";
import { Request, Response } from "express";

const getAccountBalance = async (req: Request, res: Response) => {
  const userID = req.userID;
  const userDetails = await Account.findOne({ userID });
  return res.status(200).json({ userDetails });
};

const getTransactionHistory = async (req: Request, res: Response) => {
  const userID = req.userID;
  console.log(userID);
  const transaction = await Transaction.find({
    userID,
  });
  return res.status(200).json(transaction);
};

const transferMoney = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { userID } = req;
  const { to, amount } = req.body;

  const sender = await Account.findOne({ userID }).session(session);
  if (!sender) {
    await session.abortTransaction();
    return res.status(404).json({ message: "Sender account not found" });
  }
  if (amount <= 0) {
    return res.status(403).json({ message: "Please add a proper amount" });
  }
  if (sender.balance < amount) {
    await session.abortTransaction();
    return res.status(403).json({ message: "Insufficient money" });
  }
  console.log("Sender", sender);

  const receiver = await Account.findOne({ userID: to }).session(session);
  if (!receiver) {
    await session.abortTransaction();
    return res.status(403).json({ message: "Receive is not exists" });
  }

  const senderAccount = await Account.findOneAndUpdate(
    { userID: sender.userID },
    { $inc: { balance: -amount } }
  ).session(session);

  const receiverAccount = await Account.findOneAndUpdate(
    { userID: receiver.userID },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();

  try {
    const senderTransaction = await Transaction.create({
      userID: sender._id,
      counterUser: receiver._id,
      amount: -amount,
      transactionType: "Debit",
    });
    const receiverTransaction = await Transaction.create({
      userID: receiver._id,
      counterUser: sender._id,
      amount: amount,
      transactionType: "Credit",
    });
  } catch (error) {
    return res.status(403).json({
      message: "transaction is completed, Just taking some to verify",
    });
  }

  return res.status(200).json({ message: "Transaction successfull" });
};
export { getAccountBalance, transferMoney, getTransactionHistory };
