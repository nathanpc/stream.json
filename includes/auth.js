// auth.js
// Authentication stuff.

module.exports = {
  parseHTTPAuth: function(header) {
    // header == req.headers
    var auth_header = header["authorization"] || "";
    var token = auth_header.split(/\s+/).pop() || "";
    var auth = new Buffer(token, "base64").toString();
    var parts = auth.split(/:/);

    return { "username": parts[0], "password": parts[1] };
  }
}