var events = require('events'),
  util = require('util'),
  exec = require('child_process').exec,
  Emitter = require('events').EventEmitter;

function Device() {
  Emitter.call(this);
  var skyCurl = 'curl -X POST -d "type=terminator" http://skynet.im/devices';
  this.deviceName = "";


  var _curler = function(){
    //holy mother of... 'var self = this;' took too long to figure out.
    var self = this;
    exec(skyCurl, 
      function (error, stdout, stderr){
      self.emit('_curlerdone', stdout);
      });
  };

  var _setID = function (info) {
    var response = JSON.parse(info);
    if (!(response.online)) 
      {
      this.uuid         = response.uuid;
      this.ipAddress    = response.ipAddress;
      this.token        = response.token;
      this.type         = response.type;
      this.channel      = response.channel;
      this.timestamp    = response.timestamp;
      this.online       = false;
      
      this.emit("_setIDdone", response);
      } 
      else{
        throw new Error("device uuid is taken (skynet response shows 'online': 'true'");
      }
  };

  var _printID = function (info) {
    if (info) { 
      console.log("Device uuid is '"           + this.uuid + 
                  "'\nDevice IP address is "   + this.ipAddress);

      this.emit("_printIDdone");
    
    } else {
      throw new Error("Object has no uuid. Check getID, _setID, and _curler for bugs");
    }
  };

  var _printSuccess = function () {
    console.log("Device '" + this.deviceName + "' was successfully created!");
  };

  this.getID = function(deviceName){
    this.deviceName = deviceName;
    this.emit("getIDdone");
  };
  
  this.on("getIDdone",    _curler);
  this.on("_curlerdone",  _setID);
  this.on("_setIDdone", _printID);
  this.on("_printIDdone", _printSuccess);
}

util.inherits(Device, Emitter);
module.exports = new Device();

var jason = new Device();
jason.getID('Jason');