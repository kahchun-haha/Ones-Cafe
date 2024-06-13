const Contact = require("../models/Contact");
const Suggestion = require("../models/Suggestion");
const Issue = require("../models/Issue");
const Review = require("../models/Review");

exports.handleContact = async (req, res) => {
  console.log("Received contact request:", req.body);
  try {
    const { fullName, phoneNumber } = req.body;
    const user = "visitor-" + new Date().getTime();
    const contact = new Contact({
      user: user,
      fullName: fullName,
      phoneNumber: phoneNumber,
      create_time: new Date(),
    });
    await contact.save();
    res.status(200).send("1");
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).send("0");
  }
};

exports.handleSuggestions = async (req, res) => {
  console.log("Received suggestions request:", req.body);
  try {
    const { request } = req.body;
    const user = "visitor-" + new Date().getTime();
    const suggestion = new Suggestion({
      user: user,
      request: request,
      create_time: new Date(),
    });
    await suggestion.save();
    res.status(200).send("1");
  } catch (error) {
    console.error("Error saving suggestion:", error);
    res.status(500).send("0");
  }
};

exports.handleIssue = async (req, res) => {
  console.log("Received issue request:", req.body);
  try {
    const { experiencing, email } = req.body;
    const user = "visitor-" + new Date().getTime();
    const issue = new Issue({
      user: user,
      experiencing: experiencing,
      email: email,
      create_time: new Date(),
    });
    await issue.save();
    res.status(200).send("1");
  } catch (error) {
    console.error("Error saving issue:", error);
    res.status(500).send("0");
  }
};

exports.handleReview = async (req, res) => {
  console.log("Received review request:", req.body);
  try {
    const { ratings } = req.body;
    const user = "visitor-" + new Date().getTime();
    const review = new Review({
      user: user,
      ratings: ratings,
      create_time: new Date(),
    });
    await review.save();
    res.status(200).send("1");
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).send("0");
  }
};
