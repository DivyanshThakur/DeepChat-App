import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import ErrorResponse from "../utils/ErrorResponse.js";
import sendEmail from "../services/email.js";
import User from "../models/User.js";
import config from "../config/index.js";
import { DEFAULT_AVATAR_URL } from "../utils/constants.js";

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

/**
 * @desc User Login
 * @route POST /api/auth/login
 * @access Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const errorMessage = "Invalid email or password";

  const user = await User.findOne({ email }, "email password tokenVersion");

  if (!user) {
    throw new ErrorResponse(errorMessage, 401);
  }

  const isPasswordMatched = await user.matchPassword(password);

  if (!isPasswordMatched) throw new ErrorResponse(errorMessage, 401);

  const token = user.getRefreshToken();
  user.sendRefreshToken(res, token);

  res.json({
    success: true,
    data: {
      accessToken: user.getAccessToken(),
      expiresAt: Date.now() + parseInt(config.ACCESS_TOKEN_EXPIRE_MS), // 15 min
    },
  });
});

/**
 * @desc Register User
 * @route POST /api/users
 * @access Private
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { image, name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new ErrorResponse("Password don't match", 400);
  }

  let userExists = await User.findOne({ email }, "email");

  if (userExists) {
    throw new ErrorResponse("Email already exists", 400);
  }

  let avatar;

  if (image) {
    const result = await cloudinary.uploader.upload(image, {
      upload_preset: "deepchat",
    });

    avatar = result.secure_url;
  } else {
    avatar = DEFAULT_AVATAR_URL;
  }

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });

  console.log(user);

  if (!user) {
    throw new ErrorResponse("Invalid user data", 400);
  }

  res.json({
    success: true,
    data: {
      accessToken: user.getAccessToken(),
      expiresAt: Date.now() + parseInt(config.ACCESS_TOKEN_EXPIRE_MS), // 15 min
    },
    message: "User registered successfully",
  });
});

/**
 * @desc Logout current user
 * @route POST /api/auth/logout
 * @access Private
 */
export const logout = asyncHandler(async (req, res) => {
  req.user.sendRefreshToken(res, "");
  res.json({ success: true, message: "Successfully logged out!" });
});

/**
 * @desc Refresh current token
 * @route POST /api/auth/refresh-token
 * @access Public
 */
export const refreshToken = asyncHandler(async (req, res) => {
  let cookieData = req.cookies?.jwt;

  if (!cookieData) {
    throw new ErrorResponse("Refresh token not valid", 401);
  }

  let decoded;

  try {
    decoded = jwt.verify(cookieData.token, config.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new ErrorResponse("Refresh token not valid", 401);
  }

  // token is valid and
  // we can send back an access token
  const user = await User.findById(decoded.id, "tokenVersion");

  if (!user || user.tokenVersion !== decoded.tokenVersion) {
    throw new ErrorResponse("Refresh token not valid", 401);
  }

  const token = user.getRefreshToken();
  user.sendRefreshToken(res, token);

  res.json({
    success: true,
    data: {
      accessToken: user.getAccessToken(),
      expiresAt: Date.now() + parseInt(config.REFRESH_TOKEN_EXPIRE_MS),
    },
  });
});

/**
 * @desc Update password
 * @route PUT /api/auth/update-password
 * @access Private
 */
export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  if (newPassword !== confirmNewPassword) {
    throw new ErrorResponse("Password don't match", 400);
  }

  if (currentPassword === newPassword) {
    throw new ErrorResponse("New password can't be your old password", 400);
  }

  const user = await User.findById(req.user._id, "+password");

  if (!user) {
    throw new ErrorResponse("User not found", 400);
  }

  const isMatched = await user.matchPassword(currentPassword);

  if (!isMatched) {
    throw new ErrorResponse("Current password is incorrect", 400);
  }

  user.password = newPassword;

  await user.save();

  res
    .status(201)
    .json({ success: true, message: "Password Update Successful" });
});

/**
 * @desc Forgot password
 * @route POST /api/auth/forgot-password
 * @access Public
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorResponse("Email could not be sent", 400);
  }

  const { resetToken, otp } = user.getResetPasswordToken();

  await user.save();

  const message = `
  <h1>You have requested a password reset.</h1>
  <p>${otp} is your One Time Password (OTP) to reset your password.</p>
  <p>This OTP is valid for 5 minutes. Please <u>do not share this OTP with anyone</u> for security reasons.</p>
  <p>Best regards</p>
  <p>DeepChat App</p>
  `;

  try {
    await sendEmail({
      to: email,
      subject: "Reset Password Request",
      html: message,
    });

    res.json({ success: true, data: { resetToken } });
  } catch (err) {
    user.resetPassword = undefined;
    await user.save();
    throw new ErrorResponse("Email could not be send", 500);
  }
});

/**
 * @desc Validate OTP
 * @route PUT /api/auth/validate-otp/:resetToken
 * @access Public
 */
export const validateOtp = asyncHandler(async (req, res) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const { otp } = req.body;

  const user = await User.findOne(
    {
      "resetPassword.token": token,
      "resetPassword.expiresAt": { $gt: Date.now() },
    },
    { resetPassword: 1 }
  );

  if (!user) {
    throw new ErrorResponse("Invalid Reset Token", 400);
  }

  if (user.resetPassword.otp !== otp) {
    throw new ErrorResponse("Invalid OTP", 400);
  }

  res.status(201).json({ success: true, message: "OTP verified successfully" });
});

/**
 * @desc Reset password
 * @route PUT /api/auth/reset-password/:resetToken
 * @access Public
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne(
    {
      "resetPassword.token": token,
      "resetPassword.expiresAt": { $gt: Date.now() },
    },
    "+password"
  );

  if (!user) {
    throw new ErrorResponse("Invalid Reset Token", 400);
  }

  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new ErrorResponse("Password do not match", 400);
  }

  const isMatched = await user.matchPassword(password);

  if (isMatched) {
    throw new ErrorResponse("New password can't be your old password", 400);
  }

  user.password = password;
  user.resetPassword = undefined;

  await user.save();

  res.status(201).json({ success: true, message: "Password Reset Successful" });
});

/**
 * @desc Revoke refresh token for this school and logout from all devices
 * @route POST /api/auth/revoke-refresh-tokens
 * @access Private
 */
export const revokeRefreshTokens = asyncHandler(async (req, res) => {
  const user = req.user;
  user.tokenVersion++;
  await user.save();

  user.sendRefreshToken(res, "");

  res.json({
    success: true,
    message: "All refresh token for this user has been revoked!",
  });
});
