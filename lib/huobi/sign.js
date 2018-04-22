"use strict";
var Utils = require("../../lib/utils.js");
var configs = require("./configs.js");
// var QueryString = require("querystring");
const CryptoJS = require("crypto-js");
// const crypto = require("crypto");
// const HmacSHA256 = crypto.createHmac("sha256", configs.secretKey);
const HmacSHA256 = require("crypto-js/hmac-sha256");
var path = require("path");
var utils = new Utils(path.basename(__filename));

// const capitalize = s => s.length ? (s.charAt(0).toUpperCase() + s.slice(1)) : s;

// const hmac = (request, secret, hash = "sha256", digest = "hex") => {
//   const encoding = (digest === "binary") ? "Latin1" : capitalize(digest);
//   utils.printYellow("encoding:", encoding);
//   console.log(CryptoJS.enc[capitalize(encoding)]);
//   return CryptoJS["Hmac" + hash.toUpperCase()](request, secret).toString(CryptoJS.enc[capitalize(encoding)]);
// };

exports.escapeParams = function (params) {
  utils.printBlue("\nlistParams(), transforming , sorting");
  console.log(params);
  // url encode
  var out = [];
  params.forEach(element => {
    var arr = element.split("=");
    out.push(arr[0] + "=" + encodeURIComponent(arr[1]));
    // out.push(encodeURIComponent(element));
  });
  // console.log(out);
  utils.printBlue("sort");
  console.log(out.sort());

  return out.sort();
};

exports.sha256 = function (str) {
  // const HmacSHA256 = crypto.createHmac("sha256", configs.secretKey);
  utils.printYellow("sha256()");
  console.log(str);
  console.log(configs.secretKey);

  var hash = HmacSHA256(str, configs.secretKey);
  utils.printCyan("hmacsha256");
  console.log(hash);
  console.log(hash.toString());
  // console.log()
  var out = CryptoJS.enc.Base64.stringify(hash);
  // var out = hmac(QueryString.escape(str),
  //   QueryString.escape(configs.secretKey),
  //   "sha256",
  //   "base64");
  utils.printCyan("After sha256, base64 encoding");
  console.log(out);
  return encodeURIComponent(out);
  // return out;
};
