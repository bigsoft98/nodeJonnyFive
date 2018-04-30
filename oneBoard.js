var five = require("johnny-five");
var mqtt = require("mqtt");


var board = new five.Board();;

var yellowLed;
var yellowLedCommandTopic ='iot/platform/command/yellowLed';

var tempSensor;
var tempSensorDataPublishTopic ='iot/platform/data/temp';


var mqttClient = mqtt.connect('mqtt://localhost:1883');

mqttClient.subscribe(yellowLedCommandTopic); 


board.on("ready", function() {
    
    yellowLed = new five.Led(4);
    tempSensor = new five.Thermometer({
        controller: "LM35",
        pin: "A0"
    });




    tempSensor.on("change", function() {
        currentCelsius = this.celsius;
        currentFahrenheit = this.fahrenheit;
        console.log(currentCelsius + "°C", currentFahrenheit + "°F");
        console.log("Publish to topic "+tempSensorDataPublishTopic +" "+currentCelsius);
        mqttClient.publish(tempSensorDataPublishTopic, currentCelsius += '');
    });

    mqttClient.on('message', function (topic, payload) {
        var message = payload.toString();
        console.log('Incoming message['+message+']');
        if(message === 'on'){
            yellowLed.on();
        }else{
            yellowLed.off();
        }
    });
})