import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generator from "generate-password";
import crypto from "crypto";
import { USER } from "../utils/constants.js";
import { ReqString, RUString } from "./types.js";
import config from "../config/index.js";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: RUString,
  password: {
    type: String,
    required: true,
    minLength: 6,
    select: false,
  },
  firstName: ReqString,
  lastName: ReqString,
  avatar: ReqString,
  tokenVersion: {
    type: Number,
    default: 1,
  },
  resetPassword: {
    token: String,
    otp: String,
    expiresAt: Date,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getAccessToken = function () {
  return jwt.sign({ id: this._id }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.ACCESS_TOKEN_EXPIRE,
  });
};

userSchema.methods.getRefreshToken = function () {
  return jwt.sign(
    { id: this._id, tokenVersion: this.tokenVersion },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: config.REFRESH_TOKEN_EXPIRE,
    }
  );
};

userSchema.methods.sendRefreshToken = function (res, token) {
  res.cookie(
    "jwt",
    { token },
    {
      httpOnly: true,
      expires: new Date(Number(config.REFRESH_TOKEN_EXPIRE_MS) + Date.now()),
      path: "/api/auth/refresh-token",
      sameSite: "none",
      secure: true,
    }
  );
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  const token = crypto.createHash("sha256").update(resetToken).digest("hex");
  const otp = generator.generate({
    length: 6,
    numbers: true,
    lowercase: false,
    uppercase: false,
  });

  const expiresAt = Date.now() + 3_00_000; // 5 minutes

  this.resetPassword = { token, otp, expiresAt };

  return { resetToken, otp };
};

const User = model(USER, userSchema);

export default User;
