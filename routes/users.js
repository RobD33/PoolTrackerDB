const usersRouter = require('express').Router();
const { getUsers, addUser, getUser } = require('../controllers/users')

usersRouter.route('/')
    .get(getUsers)
    .post(addUser)

usersRouter.route('/:username')
    .get(getUser)



module.exports = usersRouter;