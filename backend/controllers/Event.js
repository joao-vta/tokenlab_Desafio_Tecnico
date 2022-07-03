const { isValidObjectId } = require('mongoose');
const EventModel = require('../models/Event')

module.exports.createEvent = async (req, res) => {
    if (!req.body.userID || !req.body.descricao || !req.body.inicio || !req.body.fim) {
        return res.status(400).send("ERROR: Some parameters are missing");
    }

    if (!isValidObjectId(req.body.userID) || isNaN(req.body.inicio) || isNaN(req.body.fim)) {
        return res.status(400).send("ERROR: Some parameters are wrongly formatted");
    }

    console.log("Creating event");
    console.log(req.body.inicio);

    const newEvent = new EventModel({
        userID: req.body.userID,
        descricao: req.body.descricao,
        inicio: req.body.inicio,
        fim: req.body.fim
    })

    const createdEvent = await newEvent.save();
    return res.status(200).json(createdEvent);
}

module.exports.getUserEvents = async (req, res) => {
    if (!req.params.id || !isValidObjectId(req.params.id)) 
        return res.status(400).send("Some parameters are missing");

    const foundEvents = await EventModel.find({'userID':req.params.id});
    return res.status(200).json(foundEvents);
}

module.exports.getUserEventsInRange = async (req, res) => {
    if (!req.params.id || !isValidObjectId(req.params.id) || !req.body.inicio || !req.body.fim) 
        return res.status(400).send("Some parameters are missing");
    
    const foundEvents = await EventModel.find({
        'userID':req.params.id,
        'inicio':{$gte : req.body.inicio, $lte : req.body.fim}
    });
    return res.status(200).json(foundEvents);
}