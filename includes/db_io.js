// db_io.js
// videos.json I/O

var fs = require("fs");

module.exports = {
  watch: function(callback) {
    console.log("Watching for changes in videos.json");

    fs.watchFile("./videos.json", function(curr, prev) {
      console.log("Changes were made to videos.json");

      fs.readFile("./videos.json", "utf-8", function (err, content) {
        if (err) throw err;
        callback(content);
      });
    });
  },
  add: function(data, file, callback) {
    // TODO: Handle picture (poster) upload.
    var tmp_json = {
      "id": data.id,
      "title": data.title,
      "poster": {
        "remote": data.poster_remote,
        "location": data.poster_location
      },
      "file": {
        "remote": (data.file_remote == "true"),
        "location": data.file_location
      },
      "description": {
        "format": data.description_format,
        "text": data.description
      }
    };
    
    console.log("New video added: ");
    console.log(tmp_json);
    
    file.video.unshift(tmp_json);
    
    fs.writeFile("./videos.json", JSON.stringify(file, null, 2), "utf-8", function (err) {
      if (err) throw err;
      callback(file);
    });
  }
};