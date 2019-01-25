const apiRouter = require('express').Router();
const getDocumentation = require('../controllers/home')
const usersRouter = require('./users')
const sessionsRouter = require('./sessions')

apiRouter.use('/users', usersRouter);
apiRouter.use('/sessions', sessionsRouter)

apiRouter.route('/')
    .get(getDocumentation)

module.exports = apiRouter;