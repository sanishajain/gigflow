// const express = require("express");
// const router = express.Router();
// const protect = require("../middleware/authMiddleware");
// const bidController = require("../controllers/bidController");

// router.post("/:gigId", protect, bidController.createBid);
// router.get("/:gigId", protect, bidController.getGigBids);
// router.put("/accept/:bidId", protect, bidController.acceptBid);
// router.get("/my", protect, bidController.getMyBids);


// module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const bidController= require("../controllers/bidController");

router.post("/:gigId", auth, bidController.createBid);
router.get("/my", auth, bidController.getMyBids);        // 👈 must come first
router.get("/:gigId", auth, bidController.getGigBids);
router.put("/accept/:bidId", auth, bidController.acceptBid);

module.exports = router;
