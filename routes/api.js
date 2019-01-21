const apiRouter = require('express').Router();
const getDocumentation = require('../controllers/home')
const usersRouter = require('./users')

apiRouter.use('/users', usersRouter)

apiRouter.route('/')
    .get(getDocumentation)

module.exports = apiRouter;