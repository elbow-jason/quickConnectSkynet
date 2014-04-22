var events      = require('events'),
    util        = require('util'),
    curler      = require('./curler.js'),
    Emitter     = require('events').EventEmitter;

function Device() {

  Emitter.call(this);
  this.deviceName = "";
  var skyCurl = 'curl -X POST -d "type=terminator" http://skynet.im/devices';

  var _curler = function(){
    var self = this;
    curler(skyCurl, function(info){
    
    self.emit('_curlerdone', info);
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
      console.log(" \nDevice uuid: '"     + this.uuid + 
                  "'\nDevice IP:   '"     + this.ipAddress +
                  "'\nDevice name: '"     + this.deviceName + 
                  "'\n ");
      this.emit("_printIDdone");
    } 

    else {
      throw new Error("Object has no uuid. Check getID, _setID, and _curler for bugs");
    }
  };


  var _printSuccess = function () {
    console.log("Device '" + this.deviceName + "' was successfully created!\n ");
  };


  this.getID = function(deviceName){
    this.deviceName = deviceName;
    this.emit("getIDdone");
  };


  this.on("getIDdone",      _curler);
  this.on("_curlerdone",    _setID);
  this.on("_setIDdone",     _printID);
  this.on("_printIDdone",   _printSuccess);
} //end function Device

util.inherits(Device, Emitter);
module.exports = new Device();

var jason = new Device();
jason.getID('Jason');