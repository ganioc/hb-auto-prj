"use strict";
var https = require("https");

function HttpClient (option) {
  this.name = "HTTP_CLIENT";
  if (option.hostname === undefined) {
    throw new Error("invalid option.hostname");
  }
  this.HOSTNAME = option.hostname;
}

HttpClient.prototype.get = function (url, callback) {
  var option = {
    hostname: this.HOSTNAME,
    // port: this.PORT,
    path: url,
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };
  var resp = "";

  const req = https.request(option, (res) => {
    console.log("statusCode:" + res.statusCode);
    console.log("headers:" + res.headers);

    res.on("data", (d) => {
      console.log("GET data:");
      console.log(d);
      resp += d;
    });
    res.on("error", (err) => {
      console.log(err);
      callback(err, null);
    });
    res.on("end", () => {
      callback(null, resp);
      console.log("Get end rx");
    });
  });

  req.on("error", (e) => {
    console.log("GET req error");
    console.log(e);
    callback(e, null);
  });

  req.end();
};

HttpClient.prototype.post = function (url, data, callback) {
  var option = {
    hostname: this.HOSTNAME,
    // port: this.PORT,
    path: url,
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  };
  var resp = "";

  const req = https.request(option, (res) => {
    console.log("statusCode:" + res.statusCode);
    console.log("headers:" + res.headers);

    res.on("data", (d) => {
      console.log("POST rx data:");
      console.log(d);
      resp += d;
    });
    res.on("error", (err) => {
      console.log(err);
      callback(err, null);
    });
    res.on("end", () => {
      callback(null, resp);
      console.log("Post end rx");
    });
  });

  req.on("error", (e) => {
    console.log("POST req error");
    console.log(e);
    callback(e, null);
  });

  req.write(data);
  req.end();
};

exports.module = HttpClient;
