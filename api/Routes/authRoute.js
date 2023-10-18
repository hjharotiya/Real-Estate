import express from "express";
import { signUp } from "../Controller/authController.js";

const Arouter = express.Router();

Arouter.post("/signup", signUp);

export default Arouter;
