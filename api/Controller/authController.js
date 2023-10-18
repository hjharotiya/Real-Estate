import User from "../Models/user_model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utlis/error.js";
// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //     const hashedPassword = await bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({
      success: "true",
      message: "user created successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    next(error);
    //     next(errorHandler(550, "error in the function"));
  }
};
