
/* This is Joddy Bot. Say hello Joddy! */

/* File System */
const fs = require('fs');

/* Logger */
const logger = require('./logger.js');

/* config */
const private = require('./token.json');
const config = require('./config.json');

let commandPrefix = config.commandPrefix;
let botActivity = config.activity
let guildId = config.guildId;

/* Daily Alert */
const dailyAlert = require('./dailyAlert.js');

/* Discord.js required */
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

// ---

/* Load the commands */
fs.readdir('./commands', (err, files) => {
  if (err){ return console.log(err); }

  let cmdFiles = files.filter(f => f.split('.').pop() === 'js')
  if (cmdFiles.length <= 0){
    return logger.log('Couldn\'t find any commands!');
  }
  cmdFiles.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    logger.log(`Loaded command file: ${f}`);
    client.commands.set(props.help.name, props);
  });
});

// Bot init
client.on('ready', () => {
  logger.log(`${client.user.tag} reporting for duty!`);
  client.user.setActivity(botActivity);
});

client.on('message', async message => {
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
});

// Error handling
client.on('error', () => {
  //Handle the errors!
});

// Let's log Joddy in with your PRIVATE TOKEN, DO NOT SHARE YOUR TOKEN
client.login(private.token);

// Run the daily alert module
dailyAlert.run(client);

/* H-hello J-J-Joddy...! */