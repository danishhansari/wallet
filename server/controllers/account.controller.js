import Account from "../models/account.models.js";
import Transaction from "../models/transaction.models.js";
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

  const receiverAccount = await Account.findOneAndUpdate(
    { userID: receiver.userID },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();

  try {
    const senderTransaction = new Transaction({
      userID: sender._id,
      counterUser: receiver._id,
      amount: -amount,
      transactionType: "Debit",
    });
    await senderTransaction.save();

    const receiverTransaction = new Transaction({
      userID: receiver._id,
      counterUser: sender._id,
      amount: amount,
      transactionType: "Credit",
    });
    await receiverTransaction.save();
  } catch (error) {
    return res
      .status(403)
      .json({
        message: "transaction is completed, Just taking some to verify",
      });
  }

  return res.status(200).json({ message: "Transaction successfull" });
};
export { getAccountBalance, transferMoney };
