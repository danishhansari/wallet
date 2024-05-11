import Account from "../models/account.models.js";
import mongoose from "mongoose";

const getAccountBalance = async (req, res) => {
  const userID = req.userID;
  const userDetails = await Account.findOne({ userID });
  return res.status(200).json({ userDetails });
};

const transferMoney = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { userID } = req;
  const { to, amount } = req.body;

  const sender = await Account.findOne({ userID }).session(session);
  if (sender.balance < amount) {
    await session.abortTransaction();
    return res.status(403).json({ message: "Insufficient money" });
  }
  console.log("Sender", sender);

  const receiver = await Account.findOne({ userID: to }).session(session);
  console.log(receiver, "Receiver");
  if (!receiver) {
    await session.abortTransaction();
    return res.status(403).json({ message: "Receive is not exists" });
  }

  const senderAccount = await Account.findOneAndUpdate(
    { userID: sender.userID },
    { $inc: { balance: -amount } }
  ).session(session);

  console.log("Sender", senderAccount);
  const receiverAccount = await Account.findOneAndUpdate(
    { userID: receiver.userID },
    { $inc: { balance: amount } }
  ).session(session);
  console.log("Receiver", receiverAccount);

  await session.commitTransaction();
  return res.status(200).json({ message: "Transaction successfull" });
};
export { getAccountBalance, transferMoney };
