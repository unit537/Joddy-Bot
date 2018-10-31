const logger = require('../logger.js');
//const config = require('../config.json');
//const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    logger.log(`${message.author.tag} (ID: ${message.author.id}) Called the "Hello, World!" command with args: ${args}`)
    // the client var is a reference to the original bot client
    // the message var is a reference to the full message made by the calling user
    // the args var is the content of the message after the command string
    //
    // This is where you'll put the code that runs a command, check out this
    // "Hello, World" example!

    message.channel.send('Hello, World! I am Joddy!');
}

module.exports.help = {
    // name must match the name of the command as it should be called
    // to call this command a user must message "!example" in discord
    name: "example"
}