import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";
import User from "../models/User.js";

/**
 * @desc Access chat
 * @route POST /api/chats
 * @access Private
 */
export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new Error("Invalid user Id");
  }

  var chat = await Chat.findOne({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users")
    .populate("latestMessage");

  chat = await User.populate(chat, {
    path: "latestMessage.sender",
    select: "name avatar email",
  });

  if (!chat) {
    const chatData = {
      name: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    chat = await Chat.create(chatData);
    await chat.populate("users");
  }

  res.json({
    success: true,
    data: chat,
  });
});

/**
 * @desc Fetch all chats for a user
 * @route GET /api/chats
 * @access Private
 */
export const getChats = asyncHandler(async (req, res) => {
  const chats = Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
    .populate("users")
    .populate("admins")
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  if (!chats) {
    throw new ErrorResponse("No chat found", 400);
  }

  chats = await User.populate(chats, {
    path: "latestMessage.sender",
    select: "name avatar email",
  });

  res.json({
    success: true,
    data: chats,
  });
});

/**
 * @desc Create New Group Chat
 * @route POST /api/chats/group
 * @access Private
 */
export const createGroupChat = asyncHandler(async (req, res) => {
  const { users, name } = req.body;
  if (!users || users.length === 0 || !name) {
    throw new Error("Incomplete data");
  }

  if (users.length === 0) {
    throw new Error("Add users");
  }

  users.push(req.user_id);

  const groupChat = await Chat.create({
    name,
    users,
    isGroupChat: true,
    admins: [req.user._id],
  });

  if (!groupChat) {
    throw new Error("Unable to create group");
  }

  await groupChat.populate("users").populate("admins");

  res.json({
    success: true,
    data: groupChat,
  });
});

/**
 * @desc Update Group name
 * @route PUT /api/chats/group
 * @access Private
 */
export const updateGroupName = asyncHandler(async (req, res) => {
  const { chatId, name } = req.body;

  await Chat.findByIdAndUpdate(chatId, { name });

  res.json({
    success: true,
    message: "Group name updated",
  });
});

/**
 * @desc Add users to group
 * @route POST /api/chats/group/participants
 * @access Private
 */
export const addUserToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  await Chat.findByIdAndUpdate(chatId, { $push: { users: userId } });

  res.json({
    success: true,
    message: "Added user to the group",
  });
});

/**
 * @desc Remove users from group
 * @route DELETE /api/chats/group/participants
 * @access Private
 */
export const removeUserFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  await Chat.findByIdAndUpdate(chatId, { $pull: { users: userId } });

  res.json({
    success: true,
    message: "Added user to the group",
  });
});
