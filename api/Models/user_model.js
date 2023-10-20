import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "data:image/png;base64,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",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
