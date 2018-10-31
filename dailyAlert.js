const logger = require('./logger.js');
const config = require('./config.json');
//const Discord = require('discord.js');

module.exports.run = async (client) => {
    let checkInChannelId = config.checkInChannelId;
    let cfgCheckInTime = config.checkInTime.split(":")

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

    // Set the initial timeout when the bot is started
    let timeNow = new Date();
    let checkInTime = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate(), cfgCheckInTime[0], cfgCheckInTime[1], cfgCheckInTime[2], 0);
    let returnTime = checkInTime - timeNow;

    // If it's too late for the check-in alert today, do it tomorrow.
    if (returnTime < 0) {
    checkInTime = new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate()+1, cfgCheckInTime[0], cfgCheckInTime[1], cfgCheckInTime[2], 0);
    returnTime = checkInTime - timeNow;
    }

    // Call the checkIn function after the returnTime passes.
    client.setTimeout(checkIn, returnTime);
    logger.log(`Check-In time set to ${returnTime}ms from now`)
}