import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(
  express.json({
    limit: "20kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import Router from "./routes/user.routes.js";
import commentRouter from "./routes/comment.routes.js";

app.use("/api/v1/comments", commentRouter);

app.use("/api/v1/users", Router);
app.get("/test", (req, res) => {
  res.send("Server is working!");
  console.log("Hello");
});

export { app };
