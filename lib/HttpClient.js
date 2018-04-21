"use strict";
var https = require("https");
var Utils = require("./utils.js");
const util = require("util");
// import * as https from "https";
var path = require("path");

var utils = new Utils(path.basename(__filename));

function HttpClient (option) {
  utils.printYellow("HttpClient()");

  this.name = "HTTP_CLIENT";
  if (option.hostname === undefined) {
    throw new Error("invalid option.hostname");
  }
  this.HOSTNAME = option.hostname;
}

HttpClient.prototype.get = function (url, callback) {
  var option = {
    hostname: this.HOSTNAME.replace("https://", ""),
    // port: this.PORT,
    path: url,
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36"
    },
    timeout: 3000
  };

  console.log("\nhttps Get()");
  console.log(option);

  var resp = "";

  const req = https.request(option, (res) => {
    utils.printMagenta("\nGet response:");
    console.log("statusCode:" + res.statusCode);
    console.log("headers:" + util.inspect(res.headers,
      {showHidden: false, depth: null}));

    res.on("data", (d) => {
      utils.printYellow("\nGET data:");
      console.log(d);
      resp += d;
    });
    res.on("error", (err) => {
      console.log(err);
      callback(err, null);
    });
    res.on("end", () => {
      console.log("\nGet end rx");
      callback(null, resp);
    });
  });

  req.on("error", (e) => {
    console.log("\nGET req error");
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
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36"
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

module.exports = HttpClient;
