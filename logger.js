const fs = require('fs');

const logger = {
    log(message){
        const logMsg = `${new Date()}: ${message}`;
        console.log(logMsg);
        fs. appendFile('./_log.log', logMsg+'\r\n', function(err) {
            if (err){
                return console.log(err);
            }
        })
    }
}

module.exports = logger;