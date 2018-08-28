const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    body: String,
    date: String
});

let commentModel = mongoose.model('Comment', commentSchema);

module.exports = commentModel;