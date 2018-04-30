var five = require("johnny-five");

five.Board().on("ready", function() {
  console.log('Board ready');
  console.log("\n Yellow (between 10°C-20°C),Green (<10°C),Red(>=15°C)")  
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0"
  });

  var redLed = new five.Led(2);
  var greenLed = new five.Led(3);
  var yellowLed = new five.Led(4);
  temperature.on("change", function() {

    currentCelsius = this.celsius;
    currentFahrenheit = this.fahrenheit;
    console.log(currentCelsius + "°C", currentFahrenheit + "°F");

    if(currentCelsius >10 && currentCelsius <21){
        yellowLed.on();
        redLed.off();
        greenLed.off();
        console.log("Yellow LED on (Yellow (between 10°C-21°C),Green (<10°C),Red(>=21°C))");
    }else if(currentCelsius <10){
        greenLed.on();
        redLed.off();
        yellowLed.off();
        console.log("Green LED on (Yellow (between 10°C-21°C),Green (<10°C),Red(>=21°C))");
    }else{
        redLed.on();
        greenLed.off();
        yellowLed.off();
        console.log("Red LED on (Yellow (between 10°C-21°C),Green (<10°C),Red(>=21°C))");
    }
  });
});
console.log("\nWaiting for device to connect...");