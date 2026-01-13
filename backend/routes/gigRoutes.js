const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const gigController = require("../controllers/gigController");

router.post("/create", protect, gigController.createGig);
router.get("/get", gigController.getGigs);
router.get("/my", protect, gigController.getMyGigs);
router.delete("/:id", protect, gigController.deleteGig);

module.exports = router;
