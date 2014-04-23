
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
  this.conn            = skynet.createConnection({  
      "uuid"          : nectorArg.uuid,
      "token"         : nectorArg.token,
      "protocol"      : "websocket" 
      });
    

  this.conn.on('ready', function(data){
        var conn = this;
        console.log('Ready!');

        conn.on('message', function(data){
          if (data.payload.firstMessage){
            console.log("First loop message received...");
            conn.emit('connectionUp');
          }
          else {
            console.log("Message received...");
            for (i in data){
              if (i === "payload"){
                for (i in data.payload){
                  console.log("\t\t " + i +" is " + data.payload[i]);
                 }
              }
              else {console.log(i + " is " + data[i]);}

            }
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

  this.currentMessage = { "fwdMessage" : "nothing", "targetFunc" : "nothing" };

  this.updateMessage = function(message){
    this.currentMessage.fwdMessage = message;
  };

  this.updateFunc = function(targetFunc){
    this.currentMessage.targetFunc = targetFunc;
  };

  this.updateBoth = function(messageObj){
    var conn = this;
    this.currentMessage = messageObj;
    conn.emit("updated");
  };

  this.sendMessage = function(outgoing){
    var conn = this;
    console.log("Sending...");
    debugger;
    conn.message({
      "devices" : conn.options.uuid,
      "payload" : outgoing
     });
  };
};



device = new Connector(deviceID);

device.conn.on('connectionUp', function(){
  console.log("connection is Up...");
  var blobject = {
      "fwdMessage" : "This is the message to pass",
      "targetFunc" : "blinkBlonk"
    }
  device.conn.emit("send", blobject);
});

device.conn.on("send", device.sendMessage);