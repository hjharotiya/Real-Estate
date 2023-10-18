import User from "../Models/user_model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utlis/error.js";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({
      success: "true",
      message: "user created successfully",
      newUser,
    });
  } catch (error) {
    next(errorHandler(550, "error in the function"));
  }
};
