var five = require("johnny-five");
var mqtt = require("mqtt");
var board;
var broadcastTopic ='iot/platform/temp';

board = new five.Board();

board.on("ready", function() {
    
    yellowLed = new five.Led(4);
    var client = mqtt.connect('mqtt://localhost:1883');

    var temperature = new five.Thermometer({
        controller: "LM35",
        pin: "A0"
      });

      temperature.on("change", function() {

        currentCelsius = this.celsius;
        currentFahrenheit = this.fahrenheit;
        console.log(currentCelsius + "°C", currentFahrenheit + "°F");
        console.log("Publish to topic "+broadcastTopic +" "+currentCelsius);
        client.publish(broadcastTopic, currentCelsius += '');
      });

})

