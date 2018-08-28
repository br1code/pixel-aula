const mongoose = require('mongoose');

let topicSchema = new mongoose.Schema({
    title: String,
    description: String,
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ]
});

let topicModel = mongoose.model('Topic', topicSchema);

module.exports = topicModel;