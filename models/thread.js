const mongoose = include('mongoose');

let threadSchema = new mongoose.Schema({
    title: String,
    body: String,
    date: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

let threadModel = mongoose.model('Thread', threadSchema);

module.exports = threadModel;