const cooldownMap = new Map();

const explainCooldown = (req, res, next) => {
  const userId = req.userId;
  const now = Date.now();

  const lastRequestTime = cooldownMap.get(userId) || 0;

  if (now - lastRequestTime < 5000) {
    return res.status(429).json({
      message: "Please wait a few seconds before trying again.",
    });
  }

  cooldownMap.set(userId, now);
  next();
};

module.exports = explainCooldown;
