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
  dbConn = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  dbConn.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  dbConn.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      //handleDisconnect(); 
      console.log("Connection was dropped, reconnecting!");
      await mysql.quit();
      await mysql.connect();                        // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();
module.exports = dbConn;