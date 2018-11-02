const logger = require('../logger.js');
//const config = require('../config.json');
//const Discord = require('discord.js');

module.exports.help = {
    // name must match the name of the command as it should be called
    // to call this command a user must message "!example" in discord
    name: "say"
}

module.exports.run = async (client, message, args) => {
    logger.log(`${message.author.tag} (ID: ${message.author.id}) Called the ${exports.help.name} command with args: ${args} from ${message.channel.name} (ID: ${message.channel.id})`)

    // Delete the commanding message
    message.delete().catch(err=>{console.log(err)});

    if (message.guild.members.get(message.author.id).hasPermission('ADMINISTRATOR')) {
        // Reply with the given string
        const reply = args.join(' ');
        // Send the reply
        message.channel.send(reply);
        logger.log(`${message.author.tag} (ID: ${message.author.id}) made Joddy say: \"${reply}\"`);
    } else {
        client.users.get(message.author.id).send('You don\'t have the proper permissions to use this command, sorry!');
    }
}