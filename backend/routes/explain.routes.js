const express = require("express");
const router = express.Router();
const {
  explainContent,
  explainContentHistory,
} = require("../controllers/explain.controller");
const { verifyToken } = require("../middleware/auth");

router.post("/explain", verifyToken, explainContent);
router.get("/explain/history", verifyToken, explainContentHistory);

module.exports = router;
