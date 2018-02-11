'use strict';

const expressWinston = require('express-winston');
const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./logger');
const routes = require('./routes');
const mw = require('./middleware');

// Create a server with a host and port
const app = express();

// Proxy: get client IP from X-Forwarded-*
app.set('trust proxy', true);


// Use middleware
app.use(bodyParser.json());

// Access logger
app.use(expressWinston.logger({
    level: process.env.LOG_LEVEL || 'info',
    requestWhitelist: ['headers', 'method', 'url', 'params', 'query', 'body'],
    responseWhitelist: ['success', 'statusCode', 'totalCount', 'count'],
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
}));

// Add the route
app.use('/api/v1', routes);


// Error logger
app.use(expressWinston.errorLogger({
    level: process.env.LOG_LEVEL || 'error',
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
}));

app.use(errorHandler);

// Start the server
async function start() {

    try {
        var server = await app.listen(config.http.port);
    }
    catch (err) {
        logger.error(err);
        process.exit(1);
    }

    logger.info('Server running at:', config.http.port);

    return server;
}


// Handling error
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500);
    res.send({success: false, error: {message: err.message || 'Internal error', extra: err.extra, code: err.code || 0}});
}


exports.start = start;
exports.app = app;
