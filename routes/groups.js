const groupsRouter = require('express').Router();
const { getGroups, addGroup, getGroup } = require('../controllers/groups')

groupsRouter.route('/')
    .get(getGroups)
    .post(addGroup)

groupsRouter.route('/:group_name')
    .get(getGroup)



module.exports = groupsRouter;