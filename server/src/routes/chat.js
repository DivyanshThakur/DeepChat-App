import express from "express";
import { accessChat, addUserToGroup, createGroupChat, getChats, removeUserFromGroup, updateGroupName } from "../controllers/chat.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/").post(protect, accessChat).get(protect, getChats);
router.route('/group').post(protect, createGroupChat).put(protect, updateGroupName);
router.route('/group/participants').post(protect, addUserToGroup).delete(protect, removeUserFromGroup);

export default router;
