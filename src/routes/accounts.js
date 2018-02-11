var express = require('express');
var router = express.Router();
var mw = require('../middleware');

router.post('/',
    mw.missingQueryValidator([]),
    (req, res) => {
        // DB query
        res.status(200).json({sucess: true, world: req.body.world});
    }
);

router.get('/',
    mw.missingQueryValidator(['world']),
    (req, res) => {
        // DB query
        res.status(200).json({sucess: true, world: req.query.world});
    }
);

router.get('/:accountUid',
    mw.missingQueryValidator(['hello']),
    (req, res) => {
        // DB query
        res.status(200).json({sucess: true, world: req.body.world});
    }
);

router.get('/route', (req, res) => {
    throw new Error('Your Error');
});

module.exports = router;
