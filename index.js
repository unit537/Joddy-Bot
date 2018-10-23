
/* This is Joddy Bot. Say hello Joddy! */

/* config */
const private = require('./token.json');
const config = require('./config.json');

let commandPrefix = config.commandPrefix;
let guildID = config.guildId;
let checkInChannelId = config.checkInChannelId;
let cfgCheckInTime = config.checkInTime.split(":")

/* Logger */
const logger = require('./logger.js');

/* Discord.js required */
const Discord = require('discord.js');
const client = new Discord.Client();

// Bot init
client.on('ready', () => {
  logger.log(`${client.user.tag} reporting for duty!`);
  client.user.setActivity('<Break Time>');
});

// Commands from Discord via messages...
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.indexOf(commandPrefix) !== 0) return;

  const args = message.content.slice(commandPrefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'help'){
    return message.channel.send("Maybe later.");
  }

  if (command === 'say'){
    // Delete the commanding message
    message.delete().catch(err=>{});
    // Reply with the given string
    const reply = args.join(' ');
    // Send the reply
    logger.log(`${message.author.username} (ID: ${message.author.id}) made Joddy say: \"${reply}\"`);
    return message.channel.send(reply);
  }
});

client.login(private.token);

// Guild Check-In timer... (8PM EST)
// Where does JavaScript get the date info from? Node? System time?

// Set the initial timeout when the bot is started
let timeNow = new Date();
let checkInTime = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), cfgCheckInTime[0], cfgCheckInTime[1], cfgCheckInTime[2], 0);
let returnTime = checkInTime - timeNow;

if (returnTime < 0) {
  checkInTime = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate()+1, cfgCheckInTime[0], cfgCheckInTime[1], cfgCheckInTime[2], 0);
  returnTime = checkInTime - timeNow;
}

client.setTimeout(checkIn, returnTime);
logger.log(`Check-In time set to ${returnTime}ms from now`)

function checkIn(){
  logger.log('Sending daily check-in alert...');
  client.channels.get(checkInChannelId).send('@here, Don\'t forget your daily check-in today!')

  // Set a new timeout after every alert
  timeNow = new Date();
  let checkInTime = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate()+1, cfgCheckInTime[0], cfgCheckInTime[1], cfgCheckInTime[2], 0);
  returnTime = checkInTime - timeNow;
  client.setTimeout(checkIn, returnTime)
  logger.log(`Next Check-In Alert at ${returnTime}ms from now`);
}

/* H-hello J-J-Joddy...! */