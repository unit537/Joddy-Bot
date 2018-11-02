const logger = require('../logger.js');
const config = require('../config.json');
//const Discord = require('discord.js');

module.exports.help = {
    // name must match the name of the command as it should be called
    // to call this command a user must message "!example" in discord
    name: "role"
}

module.exports.run = async (client, message, args) => {
    logger.log(`${message.author.tag} (ID: ${message.author.id}) Called the ${exports.help.name} command with args: ${args} from ${message.channel.name} (ID: ${message.channel.id})`)

    let roles = config.roles;
    let errorMessage = `Available roles are:\n${roles.join('\n')}\nRemember! Role names are case-sensitive!`;

    let roleChannelId = config.roleChannelId;
    let roleAssignWrongChannelMessage = `Please use the ${message.guild.channels.get(roleChannelId).name} channel to assign yourself a role! Thank you!`;

    // Delete every message calling this command.
    message.delete().catch(err=>{console.log(err)});

    if (message.channel.id != roleChannelId) {
        return client.users.get(message.author.id).send(`${roleAssignWrongChannelMessage}`);
    }

    let user = message.guild.member(message.author);
    let guild = message.guild;
    let mode = args[0].toLowerCase();

    switch(mode){
        case 'add':
            for(var i = 1; i < args.length; i++){
                let roleName = args[i];
                let role = guild.roles.find(role => role.name === roleName);
                if (roles.indexOf(roleName) != -1 && role){
                    user.addRole(role.id);
                    logger.log(`Added ${message.author.tag} to the ${role.name} role!`);
                    client.users.get(message.author.id).send(`You have been assigned the ${role.name} role! Congrats!`);
                }
                else {
                    client.users.get(message.author.id).send(`I'm sorry but the ${role.name} role doesn't exist!\n${errorMessage}`);
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
                    client.users.get(message.author.id).send(`I've removed you from the ${role.name} role, as per your request!`);
                }
                else {
                    client.users.get(message.author.id).send(`I'm sorry but the ${role.name} role doesn't exist!\n${errorMessage}`);
                }
            }
            break;
        case 'listall':
            // Not really an error, but the errorMessage contains the relevant info...
            client.users.get(message.author.id).send(errorMessage);
            break;
    }
}