var express = require('express');
var router = express.Router();

var requireAuthentication = (req, res, next) => {

    next();
};

router.all('*', requireAuthentication);
router.use('/accounts', require('./accounts'));
// router.use('/devices', require('./devices'));
// router.use('/doors', require('./doors'));
// router.use('/users', require('./users'));
// router.use('/events', require('./events'));
// router.use('/fingerprints', require('./fingerprints'));
// router.use('/cards', require('./cards'));
// router.use('/billing', require('./billing'));
// router.use('/inspect', require('./inspect'));
// router.use('/diagnose', require('./diagnose'));

module.exports = router;
