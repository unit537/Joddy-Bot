const logger = require('../logger.js');
const config = require('../config.json');
//const Discord = require('discord.js');

module.exports = (client, message) => {
    let commandPrefix = config.commandPrefix;
    let guildId = config.guildId;
    let roleChannelId = config.roleChannelId;

    // ignore messages made by bot users
    if (message.author.bot) return;
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

    // I really don't like hardcoding the command strings here, will change this later...
    if ((message.channel.id === roleChannelId) && (command != 'role' && command != 'say')) {
        return message.delete().catch(err=>{console.log(err)});
    }

    // Ok, so technicalities here... ${commandFile} is **not** actually a reference to the file at all,
    // it is just a reference to the cached version of the file! If that file has changed at any point
    // those changes will not take effect until you restart the program.
    let commandFile = client.commands.get(command);
    if (commandFile){
        commandFile.run(client, message, args)
    }

    if (message.channel.id === roleChannelId) {
        return message.delete().catch(err=>{console.log(err)});
    }
}

module.exports.help = {
    // name must match the name of the event
    name: 'message'
}