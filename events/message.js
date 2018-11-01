const logger = require('../logger.js');
const config = require('../config.json');
//const Discord = require('discord.js');

module.exports = (client, message) => {
    let commandPrefix = config.commandPrefix;
    let guildId = config.guildId;

    // ignore messages made by bot users
    if (message.author.bot) return;
    // ignore messages that do not start with the commandPrefix
    if (message.content.indexOf(commandPrefix) !== 0) return;
    // Determine if DM
    if (message.guild != null) {
        if (message.guild.id != guildId){
            logger.log(`Accessed from different guild! Name:${message.guild.name}, ID:${message.guild.id}`);
            return;
        }
    } else {
    // This is a DM or group DM
    return;
    }

    const args = message.content.slice(commandPrefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    // TODO: Flesh out the help command
    if (command === 'help'){
        return message.channel.send("This command is a work in progress, check back later!");
    }

    let commandFile = client.commands.get(command);
    if (commandFile){
        commandFile.run(client, message, args)
    }
}

module.exports.help = {
    // name must match the name of the event
    name: 'message'
}