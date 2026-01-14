const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ READ TOKEN FROM COOKIE FIRST
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // fallback (optional)
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (err) {
    console.log("AUTH ERROR:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;
