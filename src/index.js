const debug = require('debug');
const logger = debug('app');
const hello = require('./hello');
const world = require('./world');

const fn = () => {
    return ['Support arrow function', 'Support spread'];
}

let [arrow, spread]= fn();

logger(hello + world);
logger(arrow, spread);
