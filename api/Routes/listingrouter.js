import express from "express";
import { createListing } from "../Controller/listingController.js";
import { verifyToken } from "../utlis/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);

export default router;
