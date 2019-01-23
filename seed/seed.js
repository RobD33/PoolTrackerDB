const mongoose = require('mongoose');
const { User, Session, Group } = require('../models');
const {generateRefObj, formatSessionData, formatGroupData} = require('../utils')

const seedDB = ({ userData, groupData, sessionData }) => {
    return mongoose.connection.dropDatabase()
    .then(() => User.insertMany(userData))
    .then(userDocs => {
        const userRefObj = generateRefObj(userDocs)
        return Promise.all([
            Session.insertMany(formatSessionData(sessionData, userRefObj)),
            userDocs
        ])
    })
    .then(([sessionDocs, userDocs]) => {
        const userRefObj = generateRefObj(userDocs)
        const sessionRefObj = generateRefObj(sessionDocs)
        return Promise.all ([
            Group.insertMany(formatGroupData(groupData, userRefObj, sessionRefObj)),
            userDocs,
            sessionDocs
        ])
    })
}

module.exports = seedDB;