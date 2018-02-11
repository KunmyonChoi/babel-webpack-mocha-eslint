const mysql = require('promise-mysql');
const logger = require('./logger');
const config = require('./config');

let is_db_connected = false;
let db_live_connection_count = 0;

const pool = mysql.createPool(config.db);

pool.on('connection', (connection) => {
    logger.info('DB connected!');
    is_db_connected = true;
});


pool.on('enqueue', () => {
    logger.debug('DB enqueue! waiting for available connection slot');
});

pool.on('acquire', (connection) => {
    is_db_connected = true;
    db_live_connection_count++;
    logger.debug('DB Connection %d acquired, acquired %d connections', connection.threadId, db_live_connection_count);
});

pool.on('release', (connection) => {
    db_live_connection_count--;
    logger.debug('DB Connection %d released, acquired %d connections', connection.threadId, db_live_connection_count);
});



exports.disconnect = async () => {
    await pool.end();
}

exports.pool = pool;
