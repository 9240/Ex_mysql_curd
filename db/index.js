var mysql = require('mysql');
var uuidv1 = require('uuid/v1');
var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'root',
  password : '********',
  database : 'test'
});

connection.connect();
module.exports = {
  connection:connection,
  uuidv1:uuidv1,
};