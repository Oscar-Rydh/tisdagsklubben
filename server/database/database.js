var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'database',
  user     : 'database_user',
  password : 'password',
  database : 'whisky'
});

module.exports = connection;