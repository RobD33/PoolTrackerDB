const {User} = require('../models');

exports.getUsers = (req, res, next) => {
    Users.find()
    .then(users => res.send({ users }))
    .catch(next)
}

exports.addUser = (req, res, next) => {
    const user = req.body;
    Users.findOne({username: user.username})
        .then(foundUser => {
            if (foundUser !== null) return Promise.reject({ status: 400, msg: 'username already exists'})
            else {
                const newUser = new User({
                    username: user.username,
                    email: user.email,
                    password: user.password
                })
                return User.create(newUser)
            }
        })
        .then(createdUser => {
            res.status(201).send({createdUser})
        })
        .catch(next)
}