
var curler = function(command, callback){
    var exec = require('child_process').exec;
    exec(command, function(error, stdout, stderr){  callback(stdout); });
  };

module.exports = curler;
