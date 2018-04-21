"use strict";
var Utils = require("../../lib/utils.js");
var configs = require("./configs.js");
var QueryString = require("querystring");
const crypto = require("crypto");
// const HmacSHA256 = crypto.createHmac("sha256", configs.secretKey);
var path = require("path");
var utils = new Utils(path.basename(__filename));

exports.escapeParams = function (params) {
  utils.printBlue("\nlistParams(), transforming , sorting");
  console.log(params);
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
  utils.printYellow("sha256()");
  console.log(str);

  var out = HmacSHA256.update(str).digest("base64");
  // console.log(out);
  return QueryString.escape(out);
};
