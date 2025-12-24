const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // 🔴 LOG EVERYTHING (ONCE, HERE)
  logger.error("Unhandled error", {
    message: err.message,
    statusCode,
    isOperational: err.isOperational || false,
    path: req.originalUrl,
    method: req.method,
    userId: req.userId || null,
  });

  // 🟢 Known / operational errors
  if (err.isOperational) {
    return res.status(statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // 🔥 Unknown / programming errors
  return res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
};

module.exports = errorHandler;
