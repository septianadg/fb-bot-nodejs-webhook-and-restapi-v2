'use strict';
var dbConn = require('./../config/db.config');
//Messages object create
var Messages = function(messages){
  this.sender_id     = messages.sender_id;
  this.first_name      = messages.first_name;
  this.messages      = messages.messages;
  this.created_at     = new Date();
  this.updated_at     = new Date();
};
Messages.create = function (newEmp, result) {
dbConn.query("INSERT INTO messages set ?", newEmp, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};
Messages.findById = function (id, result) {
dbConn.query("Select * from messages where id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Messages.findAll = function (result) {
dbConn.query("Select * from messages", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('messages : ', res);
  result(null, res);
}
});
};
Messages.update = function(id, messages, result){
dbConn.query("UPDATE messages SET sender_id=?,first_name=?,messages=? WHERE id = ?", [messages.sender_id,messages.first_name,messages.messages, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Messages.delete = function(id, result){
dbConn.query("DELETE FROM messages WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Messages;