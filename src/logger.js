const winston = require('winston');

// Define default Logger
module.exports = new (winston.Logger)({
    level: process.env.LOG_LEVEL || 'debug',
    transports: [
        new (winston.transports.Console)({
            json: true,
            stringify: true
        })
    ]
});
