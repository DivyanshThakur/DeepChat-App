import express from "express";
import { getCurrentUser, getAllUsers } from "../controllers/user.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(protect, getAllUsers);

router.route("/profile").get(protect, getCurrentUser);

export default router;
