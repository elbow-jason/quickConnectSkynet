
var curler          = require(process.cwd() + '/curler.js');
var fs              = require('fs');
var path            = require('path');
var cwd             = process.cwd();
var skyIDpath       = cwd + "/info/skynetID.id";

var device;


var curler = function(command, callback){
    var exec = require('child_process').exec;
    exec(command, function(error, stdout, stderr){  callback(stdout); });
  };

var getID = function(callback){
  curler('curl -X POST -d "type=terminator" http://skynet.im/devices', callback);
  };

var setSkyID = function(info){
    var response = JSON.parse(info);
    if (response.uuid) {
      console.log("Contact with Skynet.im was successful!!");
      console.log('Device uuid is '           + response.uuid);
      console.log('your IP address is '       + response.ipAddress);
      (response.token)  ?  console.log('Skynet token is present') : console.log('Skynet token is missing (error)' );
      device = response;
    }
    else {console.log("failure...");}
  console.log("Async device type: " + typeof device);
};

getID(setSkyID);
console.log("Sync device type: (before delay) " + typeof device);
var count = 0;


console.log("Sync device type: (after delay) " + typeof device);

if (typeof module !== "undefined") {module.exports = device;}
