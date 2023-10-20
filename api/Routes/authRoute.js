import express from "express";
import { google, signIn, signUp } from "../Controller/authController.js";

const Arouter = express.Router();

Arouter.post("/signup", signUp);
Arouter.post("/signin", signIn);
Arouter.post("/google", google);

export default Arouter;
