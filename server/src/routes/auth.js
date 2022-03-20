import express from "express";
import {
  loginUser,
  registerUser,
  logout,
  updatePassword,
  forgotPassword,
  validateOtp,
  resetPassword,
  refreshToken,
  revokeRefreshTokens,
} from "../controllers/auth.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").post(protect, logout);
router.route("/update-password").put(protect, updatePassword);
router.route("/forgot-password").post(forgotPassword);
router.route("/validate-otp/:resetToken").post(validateOtp);
router.route("/reset-password/:resetToken").put(resetPassword);
router.route("/refresh-token").post(refreshToken);
router.route("/revoke-refresh-tokens").post(protect, revokeRefreshTokens);

export default router;
