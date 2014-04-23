var util        = require('util'),
    curler      = require('./curler.js'),
    Emitter     = require('events').EventEmitter;

function Config() {

  this.deviceName   = "";
  var skyCurl       = 'curl -X POST -d "type=terminator" http://skynet.im/devices';

  var _curler = function(){
    var self = this;
    curler(skyCurl, function(info){ 
      self.emit('_curlerdone', info);
    });
  };

  var _setID = function (info) {
    var response = JSON.parse(info);
    if (!(response.online)) {
      for (i in response){
        this[i] = response[i];
      }
    }

    if (this.online !== false) 
      {throw new Error("skynet device already exists and is online");}

    this.emit("_setIDdone", response);
  };


  var _printID = function (info) {
    if (info) { 
      console.log(
      " \nDevice uuid: '"     + this.uuid + 
      "'\n         IP: '"     + this.ipAddress +
      "'\n       name: '"     + this.deviceName + "'\n ");
      this.emit("_printIDdone");
    } 

    else {
      throw new Error("Object has no uuid. Check getID, _setID, and _curler for bugs");
    }
  };


  var _printSuccess = function () {
    console.log(
      "Device '" +  this.deviceName + "' was successfully created!\n ");
    this.emit('deviceIDready');
  };


  this.getID = function(deviceName){
    this.deviceName = deviceName;
    this.emit("getIDdone");
  };
  this.on(  "initiate",        this.getID);
  this.on(  "getIDdone",      _curler);
  this.on(  "_curlerdone",    _setID);
  this.on(  "_setIDdone",     _printID);
  this.on(  "_printIDdone",   _printSuccess);
}//end function Device

util.inherits(Config, Emitter);
module.exports = new Config();

