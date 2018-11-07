const mongoose = include('mongoose');

let practiceSchema = new mongoose.Schema({
    type: String, // offer or request
    entity: String, // school name or company name
    description: String,
    level: String, // offer: superior/tecnico
    date: String, // when the practice was created
    phone: String, // private
    email: String // private
});

let practiceModel = mongoose.model('Practice', practiceSchema);

module.exports = practiceModel;