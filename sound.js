var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var sensor = new five.Sensor("A2");
  
  // Scale the sensor's data from 0-1023 to 0-10 and log changes
  sensor.on("change", function(data) {
    console.log(data);
  });
});

board.on("exit",function(){
  console.log("Disconnected");
})
console.log("\nWaiting for device to connect...");