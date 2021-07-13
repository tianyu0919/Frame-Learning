const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'blog'
});

conn.connect();

function dbQuery(str, paramsStr) {
    return new Promise((resolve, reject) => {
        conn.query(str, paramsStr, (err, result) => {
            if (err) {
                resolve({ code: 400, msg: err.toString() });
            }
            resolve(result);
        })
    })
}

module.exports = { conn, dbQuery };