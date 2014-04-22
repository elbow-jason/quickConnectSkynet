var exec = require('child_process').exec;

var curler = function(curlCmd, callback){
  //holy mother of... 'var self = this;' took too long to figure out.
  exec(curlCmd, function (error, stdout, stderr){
    callback(stdout);
  });
};

module.exports = curler;