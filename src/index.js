import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import express from "express";
import connectDB from "./db/index.js";
import { app } from "./app.js";

// console.log(process.env.TEST);
connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Error :", err);
      throw err;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

/*
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(`Error: ${err}`);
    throw err;
  }
})(); 
*/
