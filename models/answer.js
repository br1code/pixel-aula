const mongoose = require('mongoose');

let answerSchema = new mongoose.Schema({
    body: String,
    date: String
});

let answerModel = mongoose.model('Answer', answerModel);

module.exports = answerModel;