module.exports = {
    Mute,
    Kick,
    Ban,
    Unban,
    Unmute
}
async function Ban(message, userIDs, reason, days, interval) {
    if (!message) throw new Error("Message parameter is required.")
    if (!message.member.permissions.has('BAN_MEMBERS')) throw new Error('User Missing Permissions.')
    if (!message.guild.me.permissions.has('BAN_MEMBERS')) throw new Error('Client Missing Permissions.')
    try {
        var banned = await message.guild.fetchBans();
    } catch (err) {
        throw new Error(err)
    }
    if (banned.some((m) => m.user.id == userID)) throw new Error('User banned already.')
    if (!interval) interval = 1000
    if (!userIDs) throw new Error('This parameter is required.')
    if (!Array.isArray(userIDs)) var userIDs = userIDs.slice().trim().split(/ +/);
    for (var userID of userIDs) {
        userID = userID.replace(/[^0-9]/g, '')
        if (!userID) throw new Error('User ID is required parameter.')
        if (isNaN(userID)) throw new Error('ID does not contains numbers only.')
        if (userID.length !== 18) throw new Error("ID length should be 18.")
        try {
            var user = await message.client.users.cache.get(`${userID}`)
        } catch (err) {
            throw new Error('Invalid Discord User.')
        }
        if (!user) throw new Error('Invalid Discord User.')
        try {
            var member = await message.guild.members.cache.get(user.id)
        } catch (err) {
            var member = null
        }
        if (member !== null && !member.bannable) throw new Error('Cannot ban this guild member.')
        setTimeout(async () => {
            try {
                await message.guild.members.ban(`${user.id}`, {
                    reason: `${reason || `Banned by ${message.member.user.tag} | ${message.member.id}`}`,
                    days: `${parseInt(days) || 0}`
                })
            } catch (err) {
                throw new Error(`${err}`)
            }
        }, parseInt(interval))
    }
}

async function Kick(message, userIDs, reason, interval) {
    if (!message) throw new Error("Message parameter is required.")
    if (!message.member.permissions.has('KICK_MEMBERS')) throw new Error('User Missing Permissions.')
    if (!message.guild.me.permissions.has('KICK_MEMBERS')) throw new Error('Client Missing Permissions.')
    if (!interval) interval = 1000
    if (!userIDs) throw new Error('This parameter is required.')
    if (!Array.isArray(userIDs)) var userIDs = userIDs.slice().trim().split(/ +/);
    for (var userID of userIDs) {
        userID = userID.replace(/[^0-9]/g, '')
        if (!userID) throw new Error('User ID is required parameter.')
        if (isNaN(userID)) throw new Error('ID does not contains numbers only.')
        if (userID.length !== 18) throw new Error("ID length should be 18.")
        try {
            var member = await message.guild.members.cache.get(userID)
        } catch (err) {
            var member = null
        }
        if (member == null) throw new Error('This user is not a guild member.')
        if (member !== null && !member.bannable) throw new Error('Cannot ban this guild member.')
        setTimeout(async () => {
            try {
                await member.kick(`${member.user.id}`, {
                    reason: `${reason || `Banned by ${message.member.user.tag} | ${message.member.id}`}`,
                    days: `${parseInt(days) || 0}`
                })
            } catch (err) {
                throw new Error(`${err}`)
            }
        }, parseInt(interval))
    }
}

async function Mute(message, userIDs, roleID, interval) {
    if (!message) throw new Error("Message parameter is required.")
    if (!message.guild.me.permissions.has('MANAGE_ROLES')) throw new Error('Client Missing Permissions.')
    if (!interval) interval = 1000
    if (!userIDs) throw new Error('This parameter is required.')
    if (!Array.isArray(userIDs)) var userIDs = userIDs.slice().trim().split(/ +/);
    for (var userID of userIDs) {
        userID = userID.replace(/[^0-9]/g, '')
        if (!userID) throw new Error('User ID is required parameter.')
        if (isNaN(userID)) throw new Error('ID does not contains numbers only.')
        if (userID.length !== 18) throw new Error("ID length should be 18.")
        try {
            var member = await message.guild.members.cache.get(userID)
        } catch (err) {
            throw new Error('User not in guild.')
        }
        if (!message.guild.roles.cache.has(roleID)) throw new Error('No Mute role found.')
        if (member.roles.cache.has(roleID)) throw new Error('User Already muted.')
        setTimeout(async () => {
            try {
                await member.roles.add(roleID)
            } catch (err) {
                throw new Error(err)
            }
        }, parseInt(interval))
    }
}

async function Unban(message, userIDs, interval) {
    if (!message) throw new Error("Message parameter is required.")
    if (!message.member.permissions.has('BAN_MEMBERS')) throw new Error('User Missing Permissions.')
    if (!message.guild.me.permissions.has('BAN_MEMBERS')) throw new Error('Client Missing Permissions.')
    if (!interval) interval = 1000
    if (!userIDs) throw new Error('This parameter is required.')
    if (!Array.isArray(userIDs)) var userIDs = userIDs.slice().trim().split(/ +/);
    try {
        var banned = await message.guild.fetchBans();
    } catch (err) {
        throw new Error(err)
    }
    for (var userID of userIDs) {
        userID = userID.replace(/[^0-9]/g, '')
        if (!userID) throw new Error('User ID is required parameter.')
        if (isNaN(userID)) throw new Error('ID does not contains numbers only.')
        if (userID.length !== 18) throw new Error("ID length should be 18.")
        if (!banned.some((m) => m.user.id == userID)) throw new Error('User not banned.')
        console.log('k')
        setTimeout(async () => {
            try {
                message.guild.members.unban(userID)
            } catch (err) {
                throw new Error(err)
            }
        }, parseInt(interval))
    }
}

async function Unmute(message, userIDs, roleID, interval) {
    if (!message) throw new Error("Message parameter is required.")
    if (!message.guild.me.permissions.has('MANAGE_ROLES')) throw new Error('Client Missing Permissions.')
    if (!interval) interval = 1000
    if (!userIDs) throw new Error('This parameter is required.')
    if (!Array.isArray(userIDs)) var userIDs = userIDs.slice().trim().split(/ +/);
    for (var userID of userIDs) {
        userID = userID.replace(/[^0-9]/g, '')
        if (!userID) throw new Error('User ID is required parameter.')
        if (isNaN(userID)) throw new Error('ID does not contains numbers only.')
        if (userID.length !== 18) throw new Error("ID length should be 18.")
        try {
            var member = await message.guild.members.cache.get(userID)
        } catch (err) {
            throw new Error('User not in guild.')
        }
        if (!message.guild.roles.cache.has(roleID)) throw new Error('No Mute role found.')
        if (member.roles.cache.has(roleID)) throw new Error('User Already muted.')
        setTimeout(async () => {
            try {
                await member.roles.remove(roleID)
            } catch (err) {
                throw new Error(err)
            }
        }, parseInt(interval))
    }
}