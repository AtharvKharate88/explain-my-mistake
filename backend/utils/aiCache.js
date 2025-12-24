const crypto = require("crypto");

const aiCache = new Map();

const generateKey = (content, type) => {
  return crypto
    .createHash("sha256")
    .update(content + type)
    .digest("hex");
};

const getCachedResponse = (key) => {
  return aiCache.get(key);
};

const setCachedResponse = (key, value) => {
  aiCache.set(key, value);
};

module.exports = {
  generateKey,
  getCachedResponse,
  setCachedResponse,
};
