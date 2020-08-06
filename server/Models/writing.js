const mongoose = require('mongoose');

const writingSchema = new mongoose.Schema({
    userId: String,
    articleID: String,
    version: String,
    text: String,
    associatedSession: String,
    dateTime: Date
});

const writing = mongoose.model('writing', writingSchema);

module.exports = writing;

