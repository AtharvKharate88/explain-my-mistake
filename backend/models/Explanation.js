const mongoose = require("mongoose");
const User = require("./User");

const explanationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["code", "theory", "logic"],
    required: true,
  },
  airesponse: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Explanation = mongoose.model("Explanation", explanationSchema);

module.exports = Explanation;
