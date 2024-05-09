import mongoose from "mongoose";

export const connectDB = async (dbName) => {
  await mongoose.connect(`${process.env.MONGO_URL}/${dbName}`);
};
