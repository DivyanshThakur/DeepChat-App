import asyncHandler from "express-async-handler";
import Message from "../models/Message.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";

/**
 * @desc Send Message
 * @route POST /api/messages
 * @access Private
 */
export const sendMessage = asyncHandler(async (req, res) => {
  const { content, type, chatId } = req.body;

  if (!content || !type || !chatId) {
    throw new Error("Invalid data passed into request");
  }

  const newMessage = {
    sender: req.user._id,
    content: content,
    contentType: type,
    chat: chatId,
  };

  let message = await Message.create(newMessage);

  message = await message.populate("sender", "name avatar").execPopulate();
  message = await message.populate("chat").execPopulate();
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
