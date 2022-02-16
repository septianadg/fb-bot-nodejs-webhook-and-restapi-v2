var express = require('express');
const router = express.Router()

const webhookController =   require('../controllers/webhook.controller');
// Retrieve all
router.get('/', webhookController.findAll);
// Create a new
router.post('/', webhookController.create);

module.exports = router