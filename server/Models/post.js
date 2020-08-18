
const mongoose = require('mongoose');

const writingSchema = new mongoose.Schema({
    postuuid: String,
    data: String,
    title: String,
    userId: String,
    published: Boolean,
    datePublished: String,
    dateLastModified: String,
    version: Number,
    //text: String,
    associatedSession: String,
});

const post = mongoose.model('writing', writingSchema);

module.exports = post;

