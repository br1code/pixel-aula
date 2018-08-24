const mongoose = require('mongoose');

let answerSchema = new mongoose.Schema({
    body: String,
    Date: String
});

let answerModel = mongoose.model('Answer', answerModel);

module.exports = answerModel;