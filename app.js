// stream.json
// The geek's home media streaming server.

// Libraries
var connect = require("connect");
var http = require("http");
var fs = require("fs");
var querystring = require('querystring');

// Includes
var includes_dir = "./includes";
var misc = require(includes_dir + "/misc.js");
var db = require(includes_dir + "/db_io.js");

// Configs
var config_dir = "./config";
var config = require(config_dir + "/config.json");

// "DBs"
var videos = require("./videos.json");
var mimeTypes = require(config_dir + "/mimes.json");

var app = connect();
app.use(function(req, res) {
  if (req.method == "GET") {
    var req_path = req.url.split("/");

    if (req.url == "/list") {
      var tmp_json = JSON.parse(JSON.stringify(videos));
      
      for (var i = 0; i < tmp_json.video.length; i++) {
        delete tmp_json.video[i].poster;
        delete tmp_json.video[i].file;
      }
      
      res.writeHead(200, "OK", {'Content-Type': "application/json"});
			res.end(JSON.stringify(tmp_json), 'utf-8');
    } else if (req_path[1] == "getPoster") {
      var isRemote;
      var poster;

      for (var i = 0; i < videos.video.length; i++) {
        if (videos.video[i].id == req_path[2]) {
          isRemote = videos.video[i].poster.remote;
          poster = videos.video[i].poster.location;
        }
      }

      if (poster === undefined) {
        res.writeHead(404, "File Not Found");
        res.end();
      } else {
        res.writeHead(200, "OK", {'Content-Type': misc.getMIME(poster, mimeTypes)});
        
        if (isRemote) {
          http.get(poster, function(img_bin) {
            var data = new Buffer(parseInt(img_bin.headers["content-length"], 10));
            var pos = 0;
            
            img_bin.on("data", function(chunk) {
              chunk.copy(data, pos);
              pos += chunk.length;
            });

            img_bin.on("end", function() {
              res.end(data);
            });
          });
        } else {
          fs.readFile(poster, function(error, content) {
            res.end(content);
          });
        }
      }
    } else if (req_path[1] == "getVideo") {
      var isRemote;
      var video;

      for (var i = 0; i < videos.video.length; i++) {
        if (videos.video[i].id == req_path[2]) {
          isRemote = videos.video[i].file.remote;
          video = videos.video[i].file.location;
        }
      }

      if (video === undefined) {
        res.writeHead(404, "Video Not Found");
        res.end();
      } else {
        res.writeHead(200, "OK", {'Content-Type': "text/plain"});
        
        if (isRemote) {
          res.end(video, 'utf-8');
        } else {
          misc.generateVideoServerURL(function(videoServer) {
            res.end(videoServer + video, 'utf-8');
          }, config);
        }
      }
    } else {
      res.writeHead(403);
      res.end();
    }
  } else if (req.method == "POST") {
    var fullBody = "";

		req.on('data', function(chunk) {
			fullBody += chunk.toString();
		});
		
		req.on('end', function() {
		  if (req.url == "/add") {
        db.add(querystring.parse(fullBody), videos, function(json) {
          videos = json;
          
          res.writeHead(200, "OK", {'Content-Type': "application/json"});
          res.end(JSON.stringify(videos), 'utf-8');
        });
      } else {
        res.writeHead(403);
        res.end();
      }
		});
  } else {
    res.writeHead(403);
    res.end();
  }
});

var server = http.createServer(app);
server.listen(config.server_port, function () {
  if (server.address().address == "0.0.0.0") {
    console.log("Server running at: localhost:" + server.address().port);
  } else {
    console.log("Server running at: " + server.address().address + ":" + server.address().port);
  }
  
  db.watch(function(data) {
    videos = JSON.parse(data);
  });
});