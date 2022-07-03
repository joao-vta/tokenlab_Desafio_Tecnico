const mongoose = require('mongoose')


const EventSchema = mongoose.Schema({
    userID: mongoose.ObjectId,
    descricao: String,
    inicio: Date,
    fim: Date
})

module.exports = mongoose.model('Event', EventSchema)