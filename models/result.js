const mongoose = include('mongoose');

let resultSchema = new mongoose.Schema({
    name: String,
    date: String,
    testID: String,
    questions: [
        {
            type: Object
        }
    ]
});

let resultModel = mongoose.model('Result', resultSchema);

module.exports = resultModel;