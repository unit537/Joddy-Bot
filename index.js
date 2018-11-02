
/* This is Joddy Bot. Say hello Joddy! */

/* File System */
const fs = require('fs');

/* Logger */
const logger = require('./logger.js');

/* config */
const private = require('./token.json');
const config = require('./config.json');

/* Daily Alert */
const dailyAlert = require('./dailyAlert.js');

/* Discord.js required */
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

/* Load the events */
fs.readdir('./events', (err, files) => {
  if (err){ return console.log(err); }

  let eventFiles = files.filter(f => f.split('.').pop() === 'js')
  if (eventFiles.length <= 0){
    return logger.log('Couldn\'t find any events!');
  }
  eventFiles.forEach((f, i) =>{
    const event = require(`./events/${f}`);
    client.on(event.help.name, event.bind(null, client));
    logger.log(`Loaded event file: ${f}`);
  });
});

/* Load the commands */
fs.readdir('./commands', (err, files) => {
  if (err){ return console.log(err); }

  let cmdFiles = files.filter(f => f.split('.').pop() === 'js')
  if (cmdFiles.length <= 0){
    return logger.log('Couldn\'t find any commands!');
  }
  cmdFiles.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
    logger.log(`Loaded command file: ${f}`);
  });
});

// Let's log Joddy in with your PRIVATE TOKEN, DO NOT SHARE YOUR TOKEN
client.login(private.token);

// Run the daily alert module
dailyAlert.run(client);

/* H-hello J-J-Joddy...! */