import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/user_route.js";
import cookieParser from "cookie-parser";
import Arouter from "./Routes/authRoute.js";
import listingRouter from "./Routes/listingrouter.js";
import path from "path";
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

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Sever is running on port 3000");
});

// ************ ROUTES **************

app.use("/api/user", userRouter);
app.use("/api/auth", Arouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

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
