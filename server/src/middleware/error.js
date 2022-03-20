import ErrorResponse from "../utils/ErrorResponse.js";
import config from "../config/index.js";

export const notFound = (req, _res, next) => {
  const error = new ErrorResponse(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

export const errorHandler = (err, _req, res, _next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
    stack: config.NODE_ENV === "production" ? null : err.stack,
  });
};
