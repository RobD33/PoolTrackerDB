const usersRouter = require('express').Router();
const { getUsers, addUser } = require('../controllers/users')

usersRouter.route('/')
    .get(getUsers)
    .put(addUser)



module.exports = usersRouter;