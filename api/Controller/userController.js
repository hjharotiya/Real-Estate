import { errorHandler } from "../utlis/error.js";
import bcrypjs from "bcryptjs";
import User from "../Models/user_model.js";

export const test = (req, res) => {
  res.json({
    success: true,
    message: "hello people",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "you can only update your own account !"));
  try {
    if (req.body.password) {
      req.body.password = bcrypjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log("userVerification Error", error);
    next(error);
  }
};

// ****** delete user *****

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "you can only delete your own account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// ******** const SIGN OUT USER ************

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been signOut!");
  } catch (error) {
    next(error);
  }
};
