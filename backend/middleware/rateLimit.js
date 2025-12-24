const rateLimit = require("express-rate-limit");

const explainLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: {
    message: "Too many requests. Please slow down.",
  },
});

module.exports = {
  explainLimiter,
};
