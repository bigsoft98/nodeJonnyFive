var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  console.log('Board ready, start to detect flame...'); 
  var sensor = new five.Sensor("A2");
  
  // Scale the sensor's data from 0-1023 to 0-10 and log changes
  sensor.on("change", function(data) {
    console.log(data);
    if (parseInt(data)<100){
        console.log("Fire fire fire fire fire fire............."+data)
    }

  });
});

console.log("\nWaiting for device to connect...");