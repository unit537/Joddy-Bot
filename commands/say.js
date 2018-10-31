const logger = require('../logger.js');
//const config = require('../config.json');
//const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    logger.log(`${message.author.tag} (ID: ${message.author.id}) Called the "say" command with args: ${args}`)

    // Delete the commanding message
    message.delete().catch(err=>{});
    // Reply with the given string
    const reply = args.join(' ');
    // Send the reply
    logger.log(`${message.author.tag} (ID: ${message.author.id}) made Joddy say: \"${reply}\"`);
    message.channel.send(reply);
}

module.exports.help = {
    // name must match the name of the command as it should be called
    // to call this command a user must message "!example" in discord
    name: "say"
}