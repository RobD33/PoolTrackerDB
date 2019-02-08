const Group = require('../models');

exports.getGroups = (req, res, next) => {
    Group.find()
    .then(groups => {
        return res.send({ groups })
    })
    .catch(next)
}

exports.getGroup = (req, res, next) => {
    const { group_name } = req.params
    Group.find({ group_name })
        .then(group => {
            if (group === null) return Promise.reject({ status: 400, msg: 'Group does not exist'})
            else res.status(200).send({ group })
        })
        .catch(next)
}

exports.addGroup = (req, res, next) => {
    const groupData = req.body
    Group.findOne({group_name: groupData.group_name})
        .then(group => {
            if (group !== null) return Promise.reject({ status: 400, msg:'Group name already exists'})
            else {
                const newGroup = new Group({
                    group_name: groupData.group_name,
                    members: groupData.members,
                    created_by: groupData.created_by
                })
                return Group.create(newGroup)
            }
        })
        ,then(createdGroup => {
            res.status(201).send({ createdGroup })
        })
        .catch(next)
}