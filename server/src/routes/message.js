import express from "express";
import multer from "multer";
import { getAllMessages, sendMessage } from "../controllers/message.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({
  preservePath: true,
});

router.route("/").post(protect, upload.array("files"), sendMessage);

router.route("/:chatId").get(protect, getAllMessages);

export default router;
