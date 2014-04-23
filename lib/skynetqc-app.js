
var skynet          = require('skynet'),
    request         = require('request'),
    util            = require('util'),
    events          = require('events');

//var getID           = require('./skynetqc-getID.js');
//var device = getID;
//device.getID("Jason's Device");

var skyID = { 
  "type"      : 'terminator', 
  "ipAddress" : '50.30.215.45',
  "uuid"      : '29ef07d1-ca8c-11e3-a465-b9a19f8e957d',
  "timestamp" : '2014-04-23T02:08:29.901Z',
  "token"     : '003e1ma033y58kt94luwgnhavloez5mi', 
  "channel"   : 'main',
  "online"    :  false 
  };

var Connector = function(nectorArg) {
  this.conn            = skynet.createConnection({
    "uuid"          : nectorArg.uuid,
    "token"         : nectorArg.token,
    "protocol"      : "websocket"
    });
};

var assignDeviceID = function(deviceID){
  for (i in deviceID){
    this[i] = deviceID[i];
  }
};



var device                  = new Connector(skyID);
device.skyID                = skyID;
var ee                      = new events.EventEmitter();
device.currentFwd           = {"fwdMessage" : "default",
                               "targetFunc" : "default"}

var envelope                = {};
envelope.devices            = device.uuid;
envelope.payload            = {};



device.conn.on('ready', function(data){

  console.log('Ready');
  device.conn.status(function (data) {
    console.log(data);
  });

  device.conn.on('message', function(data){
    console.log(data);
    });

  device.conn.message(envelope);
  debugger;
  envelope.fwdMessage   = "This is the message to pass(success)";
  envelope.targetFunc   = "blinkBlonk(success)";


  ee.on("sendFwd", function(input){
    console.log("fwdMessage was heard ");
    console.log(input);
}); 
  ee.emit("sendFwd", envelope); 
});


