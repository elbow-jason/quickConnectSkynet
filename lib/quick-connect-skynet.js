
var fs              = require('fs');
var path            = require('path');
var skynet          = require('skynet');
var request         = require('request');
var utils           = require('util');
var events          = require('events');

var ee = new events.EventEmitter();
var cwdPath         = process.cwd();
var device;

var 

var loadDeviceID = function(callback){
device = require('./skynet-first-connect.js');
callback;
}






var connectSkynet = function(){

  console.log("connectSkynet");
  var conn = skynet.createConnection({
    "uuid":     device.uuid,
    "token":    device.token,
    "protocol": "websocket"

  });
  debugger;

  conn.on('ready', function(data){
    console.log('Ready');

    conn.on('message', function(data){ // do stuff with message
      console.log(data);
    });

    conn.status(function (data) {
      console.log(data);
    });

    conn.message({
      "devices": device.uuid,
      "payload": { "hello":"world" }
    });
  });
};


loadDeviceID(ee.emit('deviceIDReady'));

ee.on('deviceIDReady', );