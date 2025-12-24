const crypto = require("crypto");

const recentRequests = new Map();

const duplicateCheck = (req, res, next) => {
  const userId = req.userId;
  const { content, type } = req.body;

  const hash = crypto
    .createHash("sha256")
    .update(content + type)
    .digest("hex");

  const lastHash = recentRequests.get(userId);

  if (lastHash === hash) {
    return res.status(409).json({
      message: "Duplicate request detected. Please modify your input.",
    });
  }

  recentRequests.set(userId, hash);
  next();
};

module.exports = duplicateCheck;
