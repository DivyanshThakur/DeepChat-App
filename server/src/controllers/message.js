import asyncHandler from "express-async-handler";
import Message from "../models/Message.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import { uploadFile } from "../utils/fileUpload.js";
import { isSameDay } from "date-fns";
import urlMetadata from "url-metadata";

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
      try {
        const { url, downloadUrl } = await uploadFile(files[i]);
        fileUrls.push({
          name: files[i].originalname,
          type: files[i].mimetype,
          url: url,
          downloadUrl,
        });
      } catch (e) {
        console.log(e);
      }
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
 * @desc Get Meta Data
 * @route GET /api/messages/meta
 * @access Private
 */
export const getMetaData = asyncHandler(async (req, res) => {
  const link = req.query.link;
  const metadata = await urlMetadata(link);

  res.json({
    success: true,
    data: {
      title: metadata.title,
      image: metadata.image,
      description: metadata.description,
      source: metadata.source,
    },
  });
});

/**
 * @desc Get all messages from a chat
 * @route GET /api/messages/:chatId
 * @access Private
 */
export const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({ chat: req.params.chatId })
    .populate("sender", "name avatar email")
    .populate("chat");

  if (!messages || messages.length === 0) {
    return res.json({ success: true, data: { user: req.user, list: [] } });
  }

  const list = [];
  let prevDate = messages[0].createdAt;
  let sameDayMessages = [];

  for (var i = 0; i < messages.length; i++) {
    if (isSameDay(prevDate, messages[i].createdAt)) {
      sameDayMessages.push(messages[i]);
    } else {
      list.push({
        date: prevDate,
        messages: sameDayMessages,
      });
      sameDayMessages = [messages[i]];
      prevDate = messages[i].createdAt;
    }
  }
  list.push({
    date: prevDate,
    messages: sameDayMessages,
  });

  res.json({
    success: true,
    data: {
      user: req.user,
      list,
    },
  });
});
