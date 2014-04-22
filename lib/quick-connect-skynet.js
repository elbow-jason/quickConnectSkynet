
var skynet          = require('skynet'),
    request         = require('request'),
    utils           = require('util'),
    events          = require('events'),
    Emitter         = require('events').EventEmitter();

var device          = require('./skynetqc-getID.js');
var cwdPath         = process.cwd();




var connectSkynet = function(){

  var _getID = function(){
    var self = this;
    console.log("retrieving skynet ID");
    this.device = device;
    this.emit("deviceIDReady");
  };
  
  var conn = skynet.createConnection({
    "uuid":     device.uuid,
    "token":    device.token,
    "protocol": "websocket"

  

  var loadDeviceID = function(callback){
    device = require('./skynet-first-connect.js');
};

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