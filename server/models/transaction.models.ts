import { Schema, model, Document, Types } from "mongoose";

type ObjectId = Types.ObjectId;

interface transactionAttribute {
  userID: ObjectId;
  counterUser: ObjectId;
  amount: string;
  transactionType: string;
}
interface TransactionDocument extends transactionAttribute, Document {}

const transactionSchema = new Schema<TransactionDocument>(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    counterUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    transactionType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = model<TransactionDocument>(
  "Transaction",
  transactionSchema
);
export default Transaction;
