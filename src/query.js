const mysql = require('promise-mysql');

exports.accountDupCheck =  (account_id) => {
    let sql = mysql.format('SELECT account_uid FROM account WHERE account_id = ?', [ account_id ]);
    console.log(sql);
    return sql;
};
