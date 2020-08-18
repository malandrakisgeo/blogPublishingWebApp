const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nickName: String,
    googleID: String,
    email: {type: String, unique: true},
    lastGoogleToken: String,
    googleTokenExpiration: String,
    lastValidToken: String
});

const user = mongoose.model('User', userSchema);

module.exports = user;

