const apiRouter = require('express').Router();
const getDocumentation = require('../controllers/home')

apiRouter.route('/')
    .get(getDocumentation)

module.exports = apiRouter;