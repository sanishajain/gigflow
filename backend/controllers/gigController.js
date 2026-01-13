const Gig = require("../models/Gig");

/* ================= CREATE GIG ================= */
const createGig = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { title, description, price } = req.body;

    if (!title || !description || price == null || price < 0) {
      return res
        .status(400)
        .json({ message: "All fields required and price must be >= 0" });
    }

    const gig = await Gig.create({
      title,
      description,
      price,
      user: req.user._id,
    });

    res.status(201).json(gig);
  } catch (err) {
    console.log("CREATE GIG ERROR:", err);
    res.status(500).json({ message: "Error creating gig" });
  }
};

/* ================= GET ALL GIGS ================= */
// controllers/gigController.js
// Get All Gigs
const getGigs = async (req, res) => {
  const gigs = await Gig.find()
    .populate("user", "name email")
    .populate("assignedTo", "name email");   // THIS IS REQUIRED
  res.json(gigs);
};

// Get My Gigs
const getMyGigs = async (req, res) => {
  const gigs = await Gig.find({ user: req.user._id })
    .populate("assignedTo", "name email");   // 👈 add this
  res.json(gigs);
  console.log("USER:", req.user._id);

};


/* ================= DELETE GIG ================= */
const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.status === "assigned") {
      return res
        .status(400)
        .json({ message: "Assigned gig cannot be deleted" });
    }

    if (gig.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    await gig.deleteOne();
    res.json({ message: "Gig deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};

module.exports = {
  createGig,
  getGigs,
  getMyGigs,
  deleteGig,
};
