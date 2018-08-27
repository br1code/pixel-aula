const mongoose = require('mongoose');

let topicSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    tags: [{
        type: String
    }],
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }
    ]
});

let topicModel = mongoose.model('Topic', topicSchema);

module.exports = topicModel;