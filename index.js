var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

// Server frontpage
app.get('/', function (req, res) {
    res.send('This is TestBot Server');
});

// Facebook Webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'ad4kerjA-FbMe55en9er-B0t-Eng1n3-2401221551') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

app.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            //sendMessage(event.sender.id, {text: "Echo: " + event.message.text});
            // if (!kittenMessage(event.sender.id, event.message.text)) {
            //     sendMessage(event.sender.id, {text: "Echo: " + event.message.text});
            // }
            if(event.message.text.toLowerCase()=== 'hi')
            {
                sendMessage(event.sender.id, {text: "Hi, what is your first name?"});
            } else if(isValidDate(event.message.text.toLowerCase())) {
                sendMessage(event.sender.id, {text: "Do you want to know how many days till his next birthday?"});
            } else {
                sendMessage(event.sender.id, {text: "Tell me, your birthdate"});
            }
            
        } else if (event.postback) {
            console.log("Postback received: " + JSON.stringify(event.postback));
        }
    }
    res.sendStatus(200);
});

// generic function sending messages
function sendMessage(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

// validate date format function yyyy-mm-dd
function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
  }

// send rich message with kitten
// function kittenMessage(recipientId, text) {
    
//     text = text || "";
//     var values = text.split(' ');
    
//     if (values.length === 3 && values[0] === 'kitten') {
//         if (Number(values[1]) > 0 && Number(values[2]) > 0) {
            
//             var imageUrl = "https://placekitten.com/" + Number(values[1]) + "/" + Number(values[2]);
            
//             message = {
//                 "attachment": {
//                     "type": "template",
//                     "payload": {
//                         "template_type": "generic",
//                         "elements": [{
//                             "title": "Kitten",
//                             "subtitle": "Cute kitten picture",
//                             "image_url": imageUrl ,
//                             "buttons": [{
//                                 "type": "web_url",
//                                 "url": imageUrl,
//                                 "title": "Show kitten"
//                                 }, {
//                                 "type": "postback",
//                                 "title": "I like this",
//                                 "payload": "User " + recipientId + " likes kitten " + imageUrl,
//                             }]
//                         }]
//                     }
//                 }
//             };
    
//             sendMessage(recipientId, message);
            
//             return true;
//         }
//     }
    
//     return false;
    
// };