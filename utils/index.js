exports.generateRefObj = data => {
    const key = 'username'

    return data.reduce((acc, datum, i) => {
         acc[datum[key] || i] = datum._id
         return acc
    }, {})
}

exports.formatSessionData = (sessionData, userRefObj)=> {
    return sessionData.map(session => {
        session.matches = session.matches.map(match => {
            Object.keys(match).forEach(key => {
                match[key] = userRefObj[match[key]] || match[key]
            })
            return match
        })
        return session
    })
}

exports.formatGroupData = (groupData, userRefObj, sessionRefObj) => {
    return groupData.map(group => {
        group = {...group}
        group.members = group.members.map(member => userRefObj[member])
        group.sessions = group.sessions.map(session => sessionRefObj[session])
        group.created_by = userRefObj[group.created_by]
        return group
    })
}