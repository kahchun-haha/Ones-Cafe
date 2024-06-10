const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    user: String,
    experiencing: String,
    email: String,
    create_time: Date
});

module.exports = mongoose.model('Issue', issueSchema);
