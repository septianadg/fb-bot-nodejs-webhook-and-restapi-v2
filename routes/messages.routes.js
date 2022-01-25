const express = require('express')
const router = express.Router()
const messagesController =   require('../controllers/messages.controller');
// Retrieve all employees
router.get('/', messagesController.findAll);
// Create a new employee
router.post('/', messagesController.create);
// Retrieve a single employee with id
router.get('/:id', messagesController.findById);
// Update a employee with id
router.put('/:id', messagesController.update);
// Delete a employee with id
router.delete('/:id', messagesController.delete);
module.exports = router