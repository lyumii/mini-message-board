import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    console.log(`trying to connect to db`);
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected`);
  } catch (error) {
    console.error(`db connection failed`, error.message);
    process.exit(1);
  }
};

export default connectDB;
