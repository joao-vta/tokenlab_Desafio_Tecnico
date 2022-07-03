const { isValidObjectId } = require('mongoose');
const UserModel = require('../models/User')

module.exports.createUser = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("Some parameters are missing");
    }

    const userFound = await UserModel.findOne({'username':req.body.username});
    if (userFound) {
        return res.status(400).send("Username already exists");
    }

    const newUser = new UserModel({
        username: req.body.username,
        password: req.body.password
    })

    const UserCreated = await newUser.save();
    return res.status(200).json(UserCreated);
}

module.exports.getUser = async (req, res) => {
    if (!req.body.username || !req.body.password) 
        return res.status(400).send("Some parameters are missing");

    const userFound = await UserModel.findOne({'username':req.body.username});

    if (!userFound || userFound.password != req.body.password) 
        return res.status(400).send("Username or Password incorrect");
    else 
        return res.status(200).json(userFound);
}