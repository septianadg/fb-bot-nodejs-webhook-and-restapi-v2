'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;