const bcrypt = require("bcrypt");
const Contact = require("../models/Contact");
const Suggestion = require("../models/Suggestion");
const Issue = require("../models/Issue");
const Review = require("../models/Review");
const Announcement = require("../models/Announcement");
const User = require("../models/User");
const {
  sendNotificationEmail,
  sendIssueUpdateEmail,
} = require("../services/emailSender");

// Fetch all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}, "_id user email");
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    res.status(500).send("Error retrieving contacts");
  }
};

// Fetch all suggestions
exports.getAllSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggestion.find({}, "_id user request");
    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error retrieving suggestions:", error);
    res.status(500).send("Error retrieving suggestions");
  }
};

// Fetch all issues
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find(
      {},
      "_id user email experiencing progress reply"
    );
    res.status(200).json(issues);
  } catch (error) {
    console.error("Error retrieving issues:", error);
    res.status(500).send("Error retrieving issues");
  }
};

// Fetch all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}, "_id user ratings create_time");
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    res.status(500).send("Error retrieving reviews");
  }
};

// Admin login
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const allowedAdminEmail = "onescafe6688@gmail.com";
    const allowedAdminPassword = "onescafe";

    const allowedAdminPasswordHash = await bcrypt.hash(
      allowedAdminPassword,
      10
    );

    if (email !== allowedAdminEmail) {
      return res.status(401).send("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, allowedAdminPasswordHash);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    req.session.isAuthenticated = true;
    req.session.admin = { email };
    res.status(200).json({ email });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Error logging in");
  }
};

// Admin logout
exports.logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to logout");
    }
    res.clearCookie("connect.sid");
    res.status(200).send("Logged out");
  });
};

// Update issue progress
exports.updateIssueProgress = async (req, res) => {
  try {
    const { id, progress, reply } = req.body;
    const issue = await Issue.findByIdAndUpdate(
      id,
      { progress, reply },
      { new: true }
    );
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    await sendIssueUpdateEmail(issue.email, progress, reply);

    res.status(200).json(issue);
  } catch (error) {
    console.error("Error updating issue progress:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;
    const announcement = new Announcement({ title, message });
    await announcement.save();

    // Fetch all user emails
    const users = await User.find({}, "email");
    const recipientEmails = users.map((user) => user.email);

    // Notify users about the new announcement
    if (recipientEmails.length > 0) {
      await sendNotificationEmail(title, message, recipientEmails);
    } else {
      console.warn("No recipients to send email to");
    }

    res.status(201).json(announcement);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    await Announcement.findByIdAndDelete(id);
    res.status(200).json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
