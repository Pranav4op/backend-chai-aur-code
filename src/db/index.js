import dotenv from "dotenv";
dotenv.config({ path: "../../env" });
import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  console.log(`${process.env.MONGODB_URI}${DB_NAME}`);
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `Mongo DB connected. DB host${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.error("Error :", err);
    process.exit(1);
  }
};

export default connectDB;
