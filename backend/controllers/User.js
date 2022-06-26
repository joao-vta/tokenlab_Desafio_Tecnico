const { isValidObjectId } = require('mongoose');
const UserModel = require('../models/User')

module.exports.createUser = async (req, res) => {
    const newUser = new UserModel({
        username: req.body.username,
        password: req.body.password
    })

    const UserCreated = await newUser.save();
    return res.status(200).json(UserCreated);
}