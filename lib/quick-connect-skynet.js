
var skynet          = require('skynet'),
    request         = require('request'),
    utils           = require('util'),
    events          = require('events'),
    Emitter         = require('events').EventEmitter();

var device          = require('./skynetqc-getID.js');
var cwdPath         = process.cwd();




var connectSkynet = function(){



  var _getID = function(){
    this.device = device;
    var self    = this;
    console.log("retrieving skynet ID");
    this.device.emit("initiate");
    this.device.on("_printIDdone", self.emit("deviceIDReady"));
    }
  };
  
  var conn = skynet.createConnection({
    "uuid":     this.device.properties.uuid,
    "token":    this.device.properties.token,
    "protocol": "websocket"
  });

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

util.inherits(connectSkynet, Emitter);
