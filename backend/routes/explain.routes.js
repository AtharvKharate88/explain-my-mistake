const express = require("express");
const router = express.Router();
const {
  explainContent,
  explainContentHistory,
} = require("../controllers/explain.controller");
const verifyToken = require("../middleware/auth");
const {explainSchema}=require("../validation/explanation.schema");
const validate=require("../middleware/validate.middleware");
const { explainLimiter } = require("../middleware/rateLimit");
const explainCooldown = require("../middleware/cooldown");
const duplicateCheck = require("../middleware/duplicateCheck");

router.post("/", verifyToken,explainLimiter,explainCooldown,duplicateCheck,validate(explainSchema), explainContent);
router.get("/history", verifyToken, explainContentHistory);
module.exports = router;
