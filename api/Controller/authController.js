import User from "../Models/user_model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utlis/error.js";
// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ****************************
// ********* sign Up ***********
// *****************************
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

// ****************************
// ********* sign In ***********
// *****************************

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not Found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
