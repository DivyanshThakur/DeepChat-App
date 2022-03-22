import asyncHandler from "express-async-handler";
import User from "../models/User.js";

/**
 * @desc Get current user
 * @route GET /api/users/profile
 * @access Private
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

/**
 * @desc Get all users
 * @route GET /api/users?search=divyansh
 * @access Private
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const { search } = req.query;

  const filter = search
    ? {
        name: { $regex: search, $options: "i" },
      }
    : {};

  const users = await User.find(filter).find({ _id: { $ne: req.user._id } });

  if (!users) {
    throw new ErrorResponse("No user found", 400);
  }

  res.json({
    success: true,
    data: users,
  });
});
