import { model, Schema, Types, Document } from "mongoose";

type ObjectId = Types.ObjectId;

interface accountAttribute {
  userID: ObjectId;
  balance: number;
}

interface AccountDocument extends accountAttribute, Document {}
const accountSchema = new Schema<AccountDocument>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = model<AccountDocument>("Account", accountSchema);
export default Account;
