"use strict";
var https = require("https");
var request = require("request");

function HttpClient () {
  this.name = "HTTP_CLIENT";
  const option = {
    hostname: this.HOSTNAME,
    // port: this.PORT,
    path: inPath,
    method: "POST",
    headers: {
        "Source": "Device",
        "Content-Type": "application/json",
        "Content-Length": data.length,
    },
    rejectUnauthorized: false,
};
}

exports.module = HttpClient;
