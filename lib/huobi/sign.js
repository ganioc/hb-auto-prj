"use strict";
var Utils = require("../../lib/utils.js");
var configs = require("./configs.js");
var QueryString = require("querystring");
const crypto = require("crypto");
const HmacSHA256 = crypto.createHmac("sha256", configs.secretKey);
var path = require("path");
var utils = new Utils(path.basename(__filename));

/**
 * For digital signing calculation
 * 
 * type: TYPE_METHOD
 * value: ""
 * 
 */

function sign () {
  console.log("functionsign");
}

function signGet (addr, url) {
  console.log("signGet");
  var options = [];

  options.push({ type: TYPE_METHOD, value: "GET" });
  options.push({ type: TYPE_ADDR, value: addr.replace("https://", "") });
  options.push({ type: TYPE_URL, value: url });
   
}

function signPost () {
  console.log("signPost");
}

exports.signGet = signGet;
exports.signPost = signPost;

exports.escapeParams = function (params) {
  // utils.printBlue("\nlistParams(), transforming , sorting");
  // console.log(params);
  // url encode
  var out = [];
  params.forEach(element => {
    var arr = element.split("=");
    out.push(arr[0] + "=" + QueryString.escape(arr[1]));
  });
  // console.log(out);
  // utils.printBlue("sort");
  // console.log(out.sort());

  return out.sort();
};

exports.sha256 = function (str) {
  const HmacSHA256 = crypto.createHmac("sha256", configs.secretKey);
  utils.printYellow("\nsha256()");
  console.log(str);

  var out = HmacSHA256.update(str).digest("base64");
  // console.log(out);
  return out;
};
