// misc.js
// More stuff.

module.exports = {
  getNetworkIPs: (function () {
    // Credits: http://stackoverflow.com/a/3742915/126353
    
    var ignoreRE = /^(127\.0\.0\.1|::1|fe80(:1)?::1(%.*)?)$/i;

    var exec = require('child_process').exec;
    var cached;
    var command;
    var filterRE;

    switch (process.platform) {
    case 'win32':
    //case 'win64': // TODO: test
      command = 'ipconfig';
      filterRE = /\bIP-[^:\r\n]+:\s*([^\s]+)/g;
      // TODO: find IPv6 RegEx
      break;
    case 'darwin':
      command = 'ifconfig';
      filterRE = /\binet\s+([^\s]+)/g;
      // filterRE = /\binet6\s+([^\s]+)/g; // IPv6
      break;
    default:
      command = 'ifconfig';
      filterRE = /\binet\b[^:]+:\s*([^\s]+)/g;
      // filterRE = /\binet6[^:]+:\s*([^\s]+)/g; // IPv6
      break;
    }

    return function (callback, bypassCache) {
      if (cached && !bypassCache) {
        callback(null, cached);
        return;
      }
      // system call
      exec(command, function (error, stdout, sterr) {
        cached = [];
        var ip;
        var matches = stdout.match(filterRE) || [];
        //if (!error) {
        for (var i = 0; i < matches.length; i++) {
          ip = matches[i].replace(filterRE, '$1')
          if (!ignoreRE.test(ip)) {
            cached.push(ip);
          }
        }
        //}
        callback(error, cached);
      });
    };
  })(),
  getMIME: function(path, mimeTypes) {
    var i = path.lastIndexOf('.');
    var ext = (i < 0) ? '' : path.substr(i);
    ext = ext.substring(1);

    return mimeTypes[ext.toLowerCase()] || 'application/octet-stream';
  },
  generateVideoServerURL: function (callback, config) {
    if (config.video_server.local == false) {
      callback("http://" + config.video_server.ip + ":" + config.video_server.port + "/" + config.video_server.suffix);
    } else if (config.video_server.local == true) {
      this.getNetworkIPs(function(err, ip) {
        callback("http://" + ip[0] + ":" + config.video_server.port + "/" + config.video_server.suffix);
      }, false);
    } else {
      callback(null);
    }
  }
};