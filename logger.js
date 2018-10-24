const fs = require('fs');

function dateTimeFormatted(date){
    // Use ISO 8601 sub string
    return date.toISOString().substr(0, 19).replace('T', ' ');
    /*
    var monthStrings = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Make it easily searchable, similar to ISO 8601
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    */
}

function dateFormatted(date){
    // Use ISO 8601 sub string
    return date.toISOString().substr(0, 10).replace('T', ' ');
    /*
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${year}-${month}-${day}`
    */
}

const logger = {
    log(message){
        const logMsg = `${dateTimeFormatted(new Date())}: ${message}`;
        console.log(logMsg);
        // Append with both CR and LF for compatibility
        fs.appendFile(`./logs/${dateFormatted(new Date())}.log`, logMsg+'\r\n', function(err) {
            if (err){
                fs.writeFile(`./logs/${dateFormatted(new Date())}.log`, logMsg+'\r\n', function(err){
                    return console.log(err);
                })
                return console.log(err);
            }
        });
    }
}

module.exports = logger;