const express = require("express");
const cors = require("cors");
// const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");

const protect = require("./middleware/authMiddleware");

connectDB();
const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
  // credentials: true, // not needed for headers
}));
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const gigRoutes = require("./routes/gigRoutes");
const bidRoutes = require("./routes/bidRoutes");

// const bidRoutes = require("./routes/bidRoutes"); // New file

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);

// app.use("/api/bids", bidRoutes); // New route

app.get("/api/profile", protect, (req, res) => {
  res.json(req.user);
});

app.get("/", (req, res) => {
  res.send("GigFlow API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));