import asyncHandler from "express-async-handler";
import Message from "../models/Message.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { uploadFile } from "../utils/fileUpload.js";

/**
 * @desc Send Message
 * @route POST /api/messages
 * @access Private
 */
export const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  const files = req.files;

  if (!content || !chatId) {
    throw new Error("Invalid data passed into request");
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  if (files && files.length > 0) {
    const fileUrls = [];
    for (var i = 0; i < files.length; i++) {
      const { Location } = await uploadFile(files[i]);
      fileUrls.push(Location);
    }

    newMessage.files = fileUrls;
  }

  let message = await Message.create(newMessage);

  message = await Message.findById(message._id)
    .populate("sender", "name avatar")
    .populate("chat");

  message = await User.populate(message, {
    path: "chat.users",
    select: "name avatar email",
  });

  await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

  res.json({
    success: true,
    data: message,
  });
});

/**
 * @desc Get all messages from a chat
 * @route POST /api/messages/:chatId
 * @access Private
 */
export const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ chat: req.params.chatId })
    .populate("sender", "name avatar email")
    .populate("chat");

  res.json({
    success: true,
    data: messages,
  });
});
