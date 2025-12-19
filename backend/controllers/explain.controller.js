const model = require("../utils/ai");
const Explanation = require("../models/Explanation");
const mongoose = require("mongoose");

const explainContent = async (req, res) => {
  const { content, type } = req.body;

  if (!content || !type) {
    return res.status(400).json({ message: "content and type are required" });
  }

  if (content.length > 3000) {
    return res.status(400).json({ message: "Content too long" });
  }
  if (!req.userId) {
  return res.status(401).json({ message: "Unauthorized" });
}


  try {
    const prompt = `
You are a senior software engineer and teacher.

Analyze the following ${type}:

${content}

Respond STRICTLY in this format:

WHAT_IS_WRONG:
<text>

CORRECT_APPROACH:
<text>

MENTAL_MODEL:
<text>
`;

    // ✅ GEMINI CALL (FREE)
    const result = await model.generateContent(prompt);

    const aiText = result.response.text();

    if (!aiText) {
      return res.status(500).json({ message: "Empty AI response" });
    }

    // 🔍 PARSING LOGIC (UNCHANGED)
    const extract = (label) => {
      const regex = new RegExp(`${label}:([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`);
      const match = aiText.match(regex);
      return match ? match[1].trim() : "";
    };
    const airesponse = {
      whatIsWrong: extract("WHAT_IS_WRONG"),
      correctApproach: extract("CORRECT_APPROACH"),
      mentalModel: extract("MENTAL_MODEL"),
    };

    // 🔐 SAVE WITH OWNERSHIP
    const explanation = await Explanation.create({
      userId: req.userId,
      content,
      type,
      airesponse,
    });

    res.status(201).json({
      message: "Explanation generated",
      explanation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI failed" });
  }
};

const explainContentHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const history = await Explanation.find({ userId }).sort({ createdAt: -1 });
    Explanation.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(20)

    res.json({ history });
    
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch history",
    });
  }
};

module.exports = {
  explainContent,
  explainContentHistory,
};
