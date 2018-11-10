const mongoose = include('mongoose');

let practiceSchema = new mongoose.Schema({
    type: String,
    entity: String,
    description: String,
    level: String,
    date: String,
    phone: String,
    email: String
});

let practiceModel = mongoose.model('Practice', practiceSchema);

module.exports = practiceModel;