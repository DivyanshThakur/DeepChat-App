import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import ErrorResponse from "../utils/ErrorResponse.js";
import config from "../config/index.js";
import User from "../models/User.js";

const protect = asyncHandler(async (req, _res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ErrorResponse("Not authorized, no token", 401);
  }

  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ErrorResponse("User not found!", 400);
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ErrorResponse("Not authorized, token failed", 401);
  }
});

export { protect };
