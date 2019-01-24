const {User} = require('../models');

exports.getUsers = (req, res, next) => {
    User.find()
        .then(users => {
            return res.send({ users })
        })
        .catch(next)
}

exports.addUser = (req, res, next) => {
    const userData = req.body;
    User.findOne({username: userData.username})
        .then(foundUser => {
            if (foundUser !== null) return Promise.reject({ status: 400, msg: 'username already exists'})
            else {
                const newUser = new User({
                    username: userData.username,
                    email: userData.email,
                    password: userData.password,
                    screen_name: userData.screen_name
                })
                return User.create(newUser)
            }
        })
        .then(createdUser => {
            res.status(201).send({createdUser})
        })
        .catch(next)
}

exports.getUser = (req, res, next) => {
    const {username} = req.params;
    User.findOne( { username })
        .then(foundUser => {
            if (foundUser === null) return Promise.reject({ status: 400, msg: 'Username does not exist'})
            else res.status(200).send({foundUser})
        })
        .catch(next)
}