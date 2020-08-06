//Database

Promise = require('bluebird');
mongoose = Promise.promisifyAll(require('mongoose')); //giati omws?
let blogdb = mongoose.connect('mongodb://GeoAdmin:!QAZxsw2@localhost:27017/writingsdb', {useNewUrlParser: true});

module.exports = {
    blogdb: blogdb
};
