
var skynet          = require('skynet'),
    request         = require('request'),
    util            = require('util'),
    Emitter         = require('events').EventEmitter();

var getID           = require('./skynetqc-getID.js');


var device = getID;



var conn = skynet.createConnection({
  "uuid": "0d3a53a0-2a0b-11e3-b09c-ff4de847b2cc",
  "token": "qirqglm6yb1vpldixflopnux4phtcsor",
  "protocol": "websocket"
});




var Connector = function(nectorArg){
  this.conn            = skynet.createConnection({  
      "uuid"          : nectorArg.uuid,
      "token"         : nectorArg.token,
      "protocol"      : "websocket" 
      });
    

  this.conn.on('ready', function(data){
        console.log('Ready');

        conn.on('message', function(data){
          console.log(data);
        });

        conn.status(function (data) {
          console.log(data);
        });

        conn.message({
          "devices": nectorArg.uuid,
          "payload": { "fwdMessage": "initialMessage" }
        });
  });
 
  this.sendMessage = function(messagetopass, targetFunc){
    conn.message({
      "devices" : conn.uuid,
      "payload" : { "fwdMessage" : messagetopass,
                    "targetFunc" : targetFunc } 
     });
  };
  
};




device.getID("Jason's Device");
debugger;
device.on("deviceIDready", function(){
  device.connect = new Connector(device);
});




