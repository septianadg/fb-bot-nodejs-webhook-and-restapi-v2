const express = require('express')
const router = express.Router()
const messagesController =   require('../controllers/messages.controller');
// Retrieve all messages
router.get('/', messagesController.findAll);
// Create a new messages
router.post('/', messagesController.create);
// Retrieve a single messages with id
router.get('/:id', messagesController.findById);
// Update a messages with id
router.put('/:id', messagesController.update);
// Delete a messages with id
router.delete('/:id', messagesController.delete);
module.exports = router