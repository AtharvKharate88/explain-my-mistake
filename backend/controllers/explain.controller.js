const asyncHandler = require("../middleware/asyncHandler");
const {
  generateExplanation,
  generateHistory,
} = require("../services/explain.service");
const AppError=require("../utils/AppError");


const explainContent =asyncHandler( async (req, res) => {
  const { content, type } = req.body;
  const userId = req.userId;

  // Controller does only HTTP-level checks
  

  
    const explanation = await generateExplanation(
      userId,
      content,
      type
    );

    res.status(201).json({
      message: "Explanation generated",
      explanation,
    });
  
});

const explainContentHistory = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const history = await generateHistory(
    req.userId,
    page,
    limit
  );

  res.json({
    page,
    limit,
    count: history.length,
    history,
  });
});


module.exports = {
  explainContent,
  explainContentHistory,
};
