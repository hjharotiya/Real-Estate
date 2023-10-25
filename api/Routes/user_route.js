import express from "express";
import {
  deleteUser,
  signOut,
  test,
  updateUser,
  getUserListing,
} from "../Controller/userController.js";
import { verifyToken } from "../utlis/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListing);
router.get("/signout", signOut);

export default router;
