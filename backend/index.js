const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler=require("./middleware/error.middleware");
const logger=require("./utils/logger")

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


const explainRoutes = require("./routes/explain.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api/explain", explainRoutes);
app.use("/api", authRoutes);


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("backend is running");
});
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info("Server started", {
    port: PORT,
    env: process.env.NODE_ENV || "development",
  });
});
