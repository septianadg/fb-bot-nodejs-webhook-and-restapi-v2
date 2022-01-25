const express = require('express');
const bodyParser = require('body-parser');
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5005;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});
// Require messages routes
const messagesRoutes = require('./routes/messages.routes')
// using as middleware
app.use('/api/v1/messages', messagesRoutes)

// Require Facebook Webhook routes
const webhookRoutes = require('./routes/webhook.routes')
// Facebook Webhook using as middleware
app.use('/webhook', webhookRoutes)

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});