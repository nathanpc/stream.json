// db_io.js
// videos.json I/O

var fs = require("fs");

module.exports = {
  watch: function(callback) {
    console.log("Watching for changes in videos.json");

    fs.watchFile("./videos.json", function(curr, prev) {
      console.log("Changes!!!");

      fs.readFile("./videos.json", "utf-8", function (err, content) {
        if (err) throw err;
        console.log(content);
        callback(content);
      });
    });
  }
};