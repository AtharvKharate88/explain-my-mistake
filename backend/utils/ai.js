// C:\...\backend\utils\ai.js

const { GoogleGenerativeAI } = require("@google/generative-ai");

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY missing in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  // 💡 CORRECT: Remove the "models/" prefix.
  model: "gemini-2.5-flash",
  // You can also use "gemini-2.5-flash" if you update the dependency
});

module.exports = model;
