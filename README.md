# Joddy-Bot

Joddy-Bot is a MapleStory 2 themed Discord bot written in JavaScript. Joddy runs on [Node.js](https://nodejs.org/) and uses the [Discord.js](https://discord.js.org/) library.

### How to format the `token.json` file
```
{
    "_comment":"Joddy Bot - Beta",
    "token":"abcdefg.hijklmnop.qrs.tuv.wx.yz0123456789.10.11.12.13.14.15"
}
```
**Make sure you NEVER SHARE YOUR TOKEN!** Your token is a very special, very private thing. If you accidently share your token, immediately generate a new one at the [Discord Developer Portal](https://discordapp.com/developers/applications/)! If anyone else knows your token they can login *as your bot* and wreak havoc! Stay safe out there!

### How to format the `config.json` file
```
{
    "commandPrefix":"!",
    "activity":"Testing",
    "guildId":"000000000000000000",
    "roleChannelId":"229123190503374849",
    "checkInChannelId":"000000000000000000",
    "checkInTime":"23:59:59",
    "roles":["Archer","Assassin","Berserker","HeavyGunner","Knight","Priest","Thief","Wizard","Runeblade","Soulbinder","Striker"]
}
```
**Make sure your role names DO NOT contain spaces!** Joddy might support role names with spaces in the future!

**Role Names are Case-Sensitive!** Make sure your roles are named properly on your server and in your config!

### Adding a new command to Joddy
```
const logger = require('../logger.js');
//const config = require('../config.json');
//const Discord = require('discord.js');

module.exports.help = {
    name: "hello"
}

module.exports.run = async (client, message, args) => {
    logger.log(`${message.author.tag} (ID: ${message.author.id}) Called the ${exports.help.name} command with args: ${args} from ${message.channel.name} (ID: ${message.channel.id})`)

    message.channel.send('Hello, World! I am Joddy!');
}
```
You can create new commands for joddy by using the above template, also found at `/commands/_template.js`.

*Make sure you set the name for your command!*

*Insert your command code inside the function block `run`*