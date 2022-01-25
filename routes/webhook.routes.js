var express = require('express');
const router = express.Router()
var request = require('request');

var nextbirthday;

// Facebook Webhook
router.get('/', function (req, res) {
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

router.post('/', function (req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            var values = event.message.text.split('-');

            if(event.message.text.toLowerCase()=== 'hi')
            {
                sendMessage(event.sender.id, {text: "Hi, what is your first name?"});
            } else if (event.message.text.toLowerCase()!== 'hi' && Number(values[0])>0)
                {
                    if(isValidDate(event.message.text.toLowerCase())) 
                    {
                        nextbirthday = getNextBirthday(Number(values[2]),Number(values[1]));
                        sendMessage(event.sender.id, {text: "Do you want to know how many days till your next birthday?"});
                    } else {
                        sendMessage(event.sender.id, {text: "Tell me, your birthdate (format : yyyy-mm-dd)"});
                    }
            } else if(event.message.text.toLowerCase()=== 'yes' || event.message.text.toLowerCase()=== 'yeah' || event.message.text.toLowerCase()=== 'yup' || event.message.text.toLowerCase()=== 'sure')
            {
                sendMessage(event.sender.id, {text: "There are "+nextbirthday+" days left until your next birthday"});
            } else if(event.message.text.toLowerCase()=== 'no' || event.message.text.toLowerCase()=== 'nah')
            {
                sendMessage(event.sender.id, {text: "Goodbye"});
            } else {
                sendMessage(event.sender.id, {text: "Tell me, your birthdate (format : yyyy-mm-dd)"});
            }
            
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

//get Next Birthday
function getNextBirthday(date,month){
    var myBirthday, today, bday, diff, days;
    //myBirthday = [6,2]; // 6th of February
    myBirthday = [date,month];
    today = new Date();
    bday = new Date(today.getFullYear(),myBirthday[1]-1,myBirthday[0]);
    if( today.getTime() > bday.getTime()) {
        bday.setFullYear(bday.getFullYear()+1);
    }
    diff = bday.getTime()-today.getTime();
    days = Math.floor(diff/(1000*60*60*24));
    return days;
    //alert(days+" days until Niet's birthday!");
}

module.exports = router