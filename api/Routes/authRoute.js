import express from "express";
import { signIn, signUp } from "../Controller/authController.js";

const Arouter = express.Router();

Arouter.post("/signup", signUp);
Arouter.post("/signin", signIn);

export default Arouter;
