const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

router.post("/contact", feedbackController.handleContact);
router.post("/suggestions", feedbackController.handleSuggestions);
router.post("/issue", feedbackController.handleIssue);
router.post("/review", feedbackController.handleReview);

module.exports = router;
