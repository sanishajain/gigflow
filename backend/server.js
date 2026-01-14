const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const protect = require("./middleware/authMiddleware");

connectDB();
const app = express();

// TEMP: allow all origins (for testing)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const gigRoutes = require("./routes/gigRoutes");
const bidRoutes = require("./routes/bidRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

app.get("/api/profile", protect, (req, res) => {
  res.json(req.user);
});

app.get("/", (req, res) => {
  res.send("GigFlow API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));
