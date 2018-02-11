const express = require('express');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const mw = require('../middleware');
const pool = require('../db').pool;
const query = require('../query');

router.post('/',
    mw.missingQueryValidator(['accountId', 'accountGroupUid']),
    mw.asyncHandler(async (req, res, next) => {
        let results = [];

        // DB query
        try {
            var connection = await pool.getConnection();
        } catch (e) {
            return next({status: HttpStatus.INTERNAL_SERVER_ERROR, code: 300, message: 'MariaDB connection error', extra: e})
        }

        await connection.beginTransaction();

        try {
            // query
            results = await connection.query(query.accountDupCheck(req.query.accountId));
            if (results.length > 0) {
                console.log('error', results);
                return next({status: HttpStatus.FORBIDDEN, code: 303, message: 'Duplicate entry for key', extra: req.query.accountId});
            }

            await connection.commit();
        } catch (e) {
            await connection.rollback();
            return next({status: HttpStatus.INTERNAL_SERVER_ERROR, message: e.message, extra: e.stack});
        } finally {
            await connection.release();
        }

        res.status(200).json({sucess: true, world: req.body.world});
    })
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
