const { Session } = require('../models')

exports.getSessionsByGroup = (req, res, next) => {
    const { groupId } = req.params
    Session.find({belongs_to: groupId})
        .then((sessions => {
            res.status(200).send({sessions})
        }))
        .catch(next)
}