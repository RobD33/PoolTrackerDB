const { passwordKey } = process.env || require('../config')

exports.generateRefObj = data => {
    const key = data[0].username ? 
        'username' : 'group_name'

    return data.reduce((acc, datum, i) => {
         acc[datum[key]] = datum._id
         return acc
    }, {})
}

exports.formatGroupData = (groupData, userRefObj) => {
    return groupData.map(group => {
        group = {...group}
        group.members = group.members.map(member => userRefObj[member])
        group.created_by = userRefObj[group.created_by]
        return group
    })
}

exports.formatSessionData = (sessionData, userRefObj, groupRefObj)=> {
    return sessionData.map(session => {
        session = {...session}
        session.matches = session.matches.map(match => {
            Object.keys(match).forEach(key => {
                match[key] = userRefObj[match[key]] || match[key]
            })
            return match
        })
        session.belongs_to = groupRefObj[session.belongs_to]
        return session
    })
}

exports.passwordCheck = (encryptedPwd, foundPwd) => {
    return foundPwd === encryptedPwd.split('').map(char => passwordKey[char]).join('')
}
