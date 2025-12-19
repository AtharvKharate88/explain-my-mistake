const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const explainRoutes = require("./routes/explain.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api", explainRoutes);
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("backend is running");
});

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
