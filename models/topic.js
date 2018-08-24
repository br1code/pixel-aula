const mongoose = require('mongoose');

let topicSchema = new mongoose.Schema({
    title: String,
    date: String,
    author: {
        name: String,
        institution: String
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag"
        }
    ],
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }
    ]
});

let topicModel = mongoose.model('Topic', topicSchema);

module.exports = topicModel;