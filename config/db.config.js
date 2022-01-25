'use strict';
const mysql = require('mysql');
//local mysql db connection
// const dbConn = mysql.createConnection({
//   host     : process.env.HOST,
//   user     : process.env.USER,
//   password : process.env.PASSWORD,
//   database : process.env.DATABASE
// });
// dbConn.connect(function(err) {
//   if (err) throw err;
//   console.log("Database Connected!");
// });
// module.exports = dbConn;

var db_config = {
  host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

var dbConn;

function handleDisconnect() {
  dbConn = mysql.createPool(db_config); 
  dbConn.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                         
    } else {                                      
      throw err;                                  
    }
  });
}

handleDisconnect();
module.exports = dbConn;