const Bid = require("../models/Bid");
const Gig = require("../models/Gig");

// Create a bid
const createBid = async (req, res) => {
  try {
    const { amount, message } = req.body;
    const gigId = req.params.gigId;

    if (!amount || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.status === "assigned") {
      return res.status(400).json({ message: "This gig is already assigned" });
    }

    const bid = await Bid.create({
      gig: gigId,
      bidder: req.user._id,
      amount,
      message,
    });

    res.status(201).json(bid);
  } catch (err) {
    console.log("CREATE BID ERROR:", err);
    res.status(500).json({ message: "Error creating bid" });
  }
};

// Get bids for a gig (owner views bids)
const getGigBids = async (req, res) => {
  try {
    const gigId = req.params.gigId;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig not found" });

    if (gig.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const bids = await Bid.find({ gig: gigId }).populate("bidder", "name email");
    res.json(bids);
  } catch (err) {
    console.log("GET GIG BIDS ERROR:", err);
    res.status(500).json({ message: "Error loading bids" });
  }
};

// Accept bid
const acceptBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.bidId).populate("gig");

    if (!bid) return res.status(404).json({ message: "Bid not found" });

    if (bid.gig.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Accept selected bid
    bid.status = "accepted";
    await bid.save();

    // Assign gig
    bid.gig.assignedTo = bid.bidder;
    bid.gig.status = "assigned";
    await bid.gig.save();

    // Reject others
    await Bid.updateMany(
      { gig: bid.gig._id, _id: { $ne: bid._id } },
      { status: "rejected" }
    );

    res.json({ message: "Bid accepted", bid });
  } catch (err) {
    console.log("ACCEPT BID ERROR:", err);
    res.status(500).json({ message: "Error accepting bid" });
  }
};

// Get bids placed by logged-in user
const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({ bidder: req.user._id }).populate("gig");
    res.json(bids);
  } catch (err) {
    console.log("GET MY BIDS ERROR:", err);
    res.status(500).json({ message: "Failed to load my bids" });
  }
};

module.exports = { createBid, getGigBids, acceptBid, getMyBids };
