require('dotenv').config()

const clientId = process.env.CLIENT_ID
const token = process.env.DISCORD_TOKEN
const guildId = process.env.SERVER_ID

module.exports = {
    clientId,
    token,
    guildId
}

