const fs = require('fs');

function dateFormatted(date){
    var monthStrings = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Make it easily searchable, similar to ISO 8601
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const logger = {
    log(message){
        const logMsg = `${dateFormatted(new Date())}: ${message}`;
        console.log(logMsg);
        // Append with both CR and LF for compatibility
        fs. appendFile('./_log.log', logMsg+'\r\n', function(err) {
            if (err){
                return console.log(err);
            }
        })
    }
}

module.exports = logger;