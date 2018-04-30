var five = require("johnny-five");

five.Board().on("ready", function() {
  console.log('Board ready, start to measure temperature...');  
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0"
  });

  temperature.on("change", function() {

    currentCelsius = this.celsius;
    currentFahrenheit = this.fahrenheit;
    console.log(currentCelsius + "°C", currentFahrenheit + "°F");

  });

});
console.log("\nWaiting for device to connect...");