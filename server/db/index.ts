import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  await mongoose.connect(`${process.env.MONGO_URL}`);
};
export { connectDB };
