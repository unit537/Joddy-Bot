const logger = require('../logger.js');
const config = require('../config.json');
//const Discord = require('discord.js');

module.exports = (client) => {
    let botActivity = config.activity

    logger.log(`${client.user.tag} reporting for duty!`);
    client.user.setActivity(botActivity);
}

module.exports.help = {
    // name must match the name of the event
    name: 'ready'
}