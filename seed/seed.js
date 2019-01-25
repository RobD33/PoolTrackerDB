const mongoose = require('mongoose');
const { User, Session, Group } = require('../models');
const {generateRefObj, formatSessionData, formatGroupData} = require('../utils')

const seedDB = ({ userData, groupData, sessionData }) => {
    return mongoose.connection.dropDatabase()
    .then(() => User.insertMany(userData))
    .then(userDocs => {
        const userRefObj = generateRefObj(userDocs)
        return Promise.all([
            Group.insertMany(formatGroupData(groupData, userRefObj)),
            userDocs
        ])
    })
    .then(([groupDocs, userDocs]) => {
        const userRefObj = generateRefObj(userDocs)
        const groupRefObj = generateRefObj(groupDocs)
        return Promise.all ([
            Session.insertMany(formatSessionData(sessionData, userRefObj, groupRefObj)),
            userDocs,
            groupDocs
        ])
    })
}

module.exports = seedDB;