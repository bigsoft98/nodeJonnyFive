var five = require("johnny-five");
var mqtt = require("mqtt");
var board,yellowLed;
var commandTpoic = 'iot/platform/yellowLed';
/* 
var express = require('express'),
  app = express(),
  port = process.env.port || 3000,
  bodyParser = require('body-parser'),
  cors = require('cors');
 
var mqtt = require('mqtt'); 
var path = require('path');
 */
 
//global.client  = mqtt.connect('mqtt://localhost:1883');

board = new five.Board();

board.on("ready", function() {
    
    yellowLed = new five.Led(4);
    var client = mqtt.connect('mqtt://localhost:1883');
    
    client.on('connect', function () {
        client.subscribe(commandTpoic)  
    });


    client.on('message', function (topic, payload) {

        var message = payload.toString();
  
        console.log('Incoming message['+message+']');

        if(message === 'on'){

            yellowLed.on();
        }else{
            yellowLed.off();
        }
    });
  

})





 
/*
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
var routes = require('./api/routes/mqttRoutes');
routes(app);
*/