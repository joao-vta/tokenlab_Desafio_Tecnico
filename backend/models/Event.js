const mongoose = require('mongoose')

const EventSchema = mongoose.Schema({
    titulo: String,
    inicio: Date,
    fim: Date
})

module.exports = mongoose.model('Event', EventSchema)