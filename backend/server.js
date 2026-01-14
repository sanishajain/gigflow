const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const protect = require("./middleware/authMiddleware");

connectDB();
const app = express();

const cookieParser = require("cookie-parser");
app.use(cookieParser());


// TEMP: allow all origins (for testing)
app.use(
  cors({
    origin: "https://gigflow-git-main-gig2.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const gigRoutes = require("./routes/gigRoutes");
const bidRoutes = require("./routes/bidRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);



app.get("/", (req, res) => {
  res.send("GigFlow API running");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));
