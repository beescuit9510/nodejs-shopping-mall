const mysql = require('mysql2');
//create connections every time there is a requst is very inefficient. so that we instead create connection pool;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node',
  password: '9510',
});

module.exports = pool.promise();
