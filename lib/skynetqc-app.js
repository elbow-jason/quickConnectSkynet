
var skynet          = require('skynet'),
    request         = require('request'),
    util            = require('util'),
    Emitter         = require('events').EventEmitter();

//var getID           = require('./skynetqc-getID.js');
//var device = getID;
//device.getID("Jason's Device");


var deviceID = { 
  "type"      : 'terminator', 
  "ipAddress" : '50.30.215.45',
  "uuid"      : '29ef07d1-ca8c-11e3-a465-b9a19f8e957d',
  "timestamp" : '2014-04-23T02:08:29.901Z',
  "token"     : '003e1ma033y58kt94luwgnhavloez5mi', 
  "channel"   : 'main',
  "online"    :  false 
  };




var Connector = function(nectorArg){
  var conn            = skynet.createConnection({  
      "uuid"          : nectorArg.uuid,
      "token"         : nectorArg.token,
      "protocol"      : "websocket" 
      });
    

  conn.on('ready', function(data){
        console.log('Ready!');

        conn.on('message', function(data){
          if (data.payload.firstMessage){
            console.log("First loop message received...");
          }
        });

        conn.status(function (data) {
          console.log(data);
        });

        conn.message({
          "devices": nectorArg.uuid,
          "payload": { "firstMessage": "initialMessage" }
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

device = new Connector(deviceID);
