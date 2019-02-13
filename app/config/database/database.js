var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'db',
  user     : 'database_user',
  password : 'password',
  database : 'whisky'
});

module.exports = connection;