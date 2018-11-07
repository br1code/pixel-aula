const mongoose = include('mongoose');

let commentSchema = new mongoose.Schema({
    body: String,
    date: String,
    color: String
});

let commentModel = mongoose.model('Comment', commentSchema);

module.exports = commentModel;