const sessionsRouter = require('express').Router();
const { getSessionsByGroup } = require('../controllers/sessions')

sessionsRouter.route('/:groupId')
    .get(getSessionsByGroup)



module.exports = sessionsRouter;