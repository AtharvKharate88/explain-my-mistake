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
},{
    timestamps: true, // 🔥 THIS LINE FIXES YOUR BUG
  });
explanationSchema.index({ userId: 1, createdAt: -1 });


const Explanation = mongoose.model("Explanation", explanationSchema);

module.exports = Explanation;
