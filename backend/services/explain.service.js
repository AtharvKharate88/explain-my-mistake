const model = require("../utils/ai");
const Explanation = require("../models/Explanation");
const {
  generateKey,
  getCachedResponse,
  setCachedResponse,
} = require("../utils/aiCache");
const logger = require("../utils/logger");

/**
 * Generate AI explanation for given content
 */
const generateExplanation = async (userId, content, type) => {
  const startTime = Date.now();

  logger.info("AI explain request started", {
    userId,
    type,
    contentLength: content.length,
  });

  // 1️⃣ CACHE CHECK
  const cacheKey = generateKey(content, type);
  const cached = getCachedResponse(cacheKey);
  if (cached) {
    return cached;
  }

  // 2️⃣ STRICT JSON PROMPT
  const prompt = `
You are a senior software engineer and teacher.

Analyze the following ${type}:

${content}

Return ONLY valid JSON in this exact shape:

{
  "whatIsWrong": "...",
  "correctApproach": "...",
  "mentalModel": "..."
}

Do not add any extra text.
`;

  // 3️⃣ AI CALL
  let aiText;
  try {
    const result = await model.generateContent(prompt);
    aiText = result.response.text();
  } catch (err) {
    logger.error("AI explain request failed", {
      userId,
      type,
      error: err.message,
    });
    throw err;
  }

  if (!aiText) {
    throw new Error("Empty AI response");
  }

  // 4️⃣ ROBUST JSON PARSING (WITH FALLBACK)
  let airesponse;
  try {
    // First attempt: direct JSON
    airesponse = JSON.parse(aiText);
  } catch (err) {
    // Fallback: extract JSON block
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      logger.error("AI response missing JSON", {
        userId,
        type,
        rawResponse: aiText.slice(0, 300),
      });
      throw new Error("AI response format invalid");
    }

    try {
      airesponse = JSON.parse(jsonMatch[0]);
    } catch (err2) {
      logger.error("AI response JSON parsing failed", {
        userId,
        type,
        rawResponse: aiText.slice(0, 300),
      });
      throw new Error("AI response format invalid");
    }
  }

  // 5️⃣ SAVE TO DB
  const explanation = await Explanation.create({
    userId,
    content,
    type,
    airesponse,
  });

  // 6️⃣ SAVE TO CACHE
  setCachedResponse(cacheKey, explanation);

  logger.info("AI explain request success", {
    userId,
    type,
    durationMs: Date.now() - startTime,
  });

  return explanation;
};

/**
 * Fetch paginated explanation history
 */
const generateHistory = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  return await Explanation.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

module.exports = {
  generateExplanation,
  generateHistory,
};
