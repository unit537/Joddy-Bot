const logger = require('../logger.js');
const config = require('../config.json');
//const Discord = require('discord.js');

let roles = config.roles;

module.exports.run = async (client, message, args) => {
    logger.log(`${message.author.tag} (ID: ${message.author.id}) Called the "role" command with args: ${args}`)

    let user = message.guild.member(message.author);
    let guild = message.guild;
    let mode = args[0].toLowerCase();
    let errorMessage = `Available roles are:\n${roles.join(', ')}\nRemember! Role names are case-sensitive!`;

    switch(mode){
        case 'add':
            for(var i = 1; i < args.length; i++){
                let roleName = args[i];
                let role = guild.roles.find(role => role.name === roleName);
                if (roles.indexOf(roleName) != -1 && role){
                    user.addRole(role.id);
                    logger.log(`Added ${message.author.tag} to the ${role.name} role!`);
                }
                else {
                    message.channel.send(errorMessage);
                }
            }
            break;
        case 'remove':
            for(var j = 1; j < args.length; j++){
                let roleName = args[j];
                let role = guild.roles.find(role => role.name === roleName);
                if (roles.indexOf(roleName) != -1 && role){
                    user.removeRole(role.id,'Bot Action');
                    logger.log(`Removed ${message.author.tag} from the ${role.name} role!`);
                }
                else {
                    message.channel.send(errorMessage);
                }
            }
            break;
        case 'listall':
            // Not really an error, but the errorMessage contains the relevant info...
            message.channel.send(errorMessage);
            break;
    }
}

module.exports.help = {
    // name must match the name of the command as it should be called
    // to call this command a user must message "!example" in discord
    name: "role"
}