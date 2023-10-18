import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/user_route.js";
import Arouter from "./Routes/authRoute.js";
dotenv.config();

// ************ CONNECTING TO DATABASE ***************
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDb!");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Sever is running on port 3000");
});

// ************ ROUTES **************

app.use("/api/user", userRouter);
app.use("/api/auth", Arouter);

// ********** MIDDLEWARE *********
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
