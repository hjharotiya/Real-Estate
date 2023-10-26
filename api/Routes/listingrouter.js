import express from "express";
import {
  createListing,
  deleteListing,
} from "../Controller/listingController.js";
import { verifyToken } from "../utlis/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
