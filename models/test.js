const mongoose = require('mongoose');

let testSchema = new mongoose.Schema({
    teacher: String,
    email: String,
    school: String,
    area: String,
    date: String,
    questions: [
        {
            type: Object
        }
    ],
    results: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Result'
        }
    ]
});

let testModel = mongoose.model('Test', testSchema);

module.exports = testModel;