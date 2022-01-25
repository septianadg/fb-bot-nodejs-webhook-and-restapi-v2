'use strict';
const Messages = require('../models/messages.model');
exports.findAll = function(req, res) {
Messages.findAll(function(err, messages) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', messages);
  res.send(messages);
});
};
exports.create = function(req, res) {
const new_messages = new Messages(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Messages.create(new_messages, function(err, messages) {
  if (err)
  res.send(err);
  res.json({error:false,message:"Messages added successfully!",data:messages});
});
}
};
exports.findById = function(req, res) {
Messages.findById(req.params.id, function(err, messages) {
  if (err)
  res.send(err);
  res.json(messages);
});
};
exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Messages.update(req.params.id, new Messages(req.body), function(err, messages) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'Messages successfully updated' });
});
}
};
exports.delete = function(req, res) {
Messages.delete( req.params.id, function(err, messages) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'Messages successfully deleted' });
});
};