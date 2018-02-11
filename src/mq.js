const amqp = require('amqplib');
const config = require('./config');
const logger = require('./logger');


////////////////////////////////////////////////////////////////////////////////
// Handling connection

let connection = null;
let jobChannel = null;
let jobTimer = null;
let controlChannel = null;
let controlTimer = null;

let connection_retry_count = 0;
let channel_retry_count = 0;

function reconnect () {
    connection_retry_count++;
    let delay = (connection_retry_count % 4) * config.mq.retryDelay;
    logger.info('AMQP retry connect', connection_retry_count, 'after', delay);
    setTimeout(()=>connect(), delay);
    return connection_retry_count;
}

async function connect () {
    if(connection != null) return connection;

    try {
        connection = await amqp.connect(config.mq.url);
        connection_retry_count = 0;
        logger.info('AMQP connection success');
    } catch (err) {
        logger.info('AMQP connection fail, %s', err);
        connection = null;
        reconnect();
        return connection;
    }

    connection.on('error', err => {
        logger.info('AMQP connection error, %s', err);
    });

    connection.on('close', () => {
        logger.info('AMQP connection closed');
        connection = null;
        reconnect();
    });

    await createChannels();
    return connection;
}

async function disconnect () {
    await connection.close();
}


function retryChannel () {
    channel_retry_count++;
    if (channel_retry_count > config.mq.maxRetryCount)
        throw new Error('AMQP max retry count reached');
    let delay = (channel_retry_count % 4) * config.mq.retryDelay;
    logger.info('AMQP retry create channel after ' + delay + 'ms');
    jobTimer = setTimeout(()=>createChannels(), delay);
}


async function createChannels () {
    if (!connection) {
        clearTimeout(jobTimer);
        clearTimeout(controlTimer);
        reconnect();
        return;
    }

    if(jobChannel == null) {
        try {
            jobChannel = await connection.createChannel();
            channel_retry_count = 0;
            logger.info('AMQP job channel success');
        } catch(err) {
            logger.info('AMQP connection fail, %s', err);
            jobChannel = null;
            retryChannel();
            return;
        }

        jobChannel.on('error', err => {
            logger.info('AMQP job channel error, %s', err);
        });
        jobChannel.on('close', () => {
            logger.info('AMQP job channel closed');
            jobChannel = null;
            retryChannel();
        });
    }

    if(controlChannel == null) {
        try {
            controlChannel = await connection.createChannel();
            channel_retry_count = 0;
            logger.info('AMQP control channel success');
        } catch(err) {
            logger.info('AMQP connection fail, %s', err);
            controlChannel = null;
            retryChannel();
            return;
        }

        controlChannel.on('error', err => {
            logger.info('AMQP control channel error, %s', err);
        });
        controlChannel.on('close', () => {
            logger.info('AMQP control channel closed');
            controlChannel = null;
            retryChannel();
        });
    }
}

exports.connect = connect;
exports.disconnect = disconnect;
exports.reconnect = reconnect;
