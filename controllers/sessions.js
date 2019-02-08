const { Session } = require('../models')

exports.getSessionsByGroup = (req, res, next) => {
    const { groupId } = req.params
    Session.find({belongs_to: groupId})
        .then((sessions => {
            if (sessions === null) return Promise.reject({status: 400, msg:'group ID does not exist'})
            else res.status(200).send({sessions})
        }))
        .catch(next)
}