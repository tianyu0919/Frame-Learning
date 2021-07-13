const mysql = require('mysql');

// 链接数据库
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'node'
});

// 建立链接
connection.connect();

export default connection;