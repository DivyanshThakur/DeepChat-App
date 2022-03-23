import express from "express";
import { getAllMessages, sendMessage } from "../controllers/message.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(protect, sendMessage);

router.route("/:chatId").get(protect, getAllMessages);

export default router;
