"use strict";

// var HttpClient = require("../HttpClient.js");
var QueryString = require("querystring");
var Utils = require("../../lib/utils.js");
var configs = require("./configs.js");
var HttpClient = require("../HttpClient.js");
var Sign = require("./sign");

function HuobiClient () {
  this.name = "HUOBI_CLIENT";
  this.client = new HttpClient({ hostname: configs.addr });
}
// /* GET /market/history/kline?period=1day&size=200&symbol=btcusdt */
HuobiClient.prototype.getTry = function () {
  Utils.printYellow("\nTry GET from server:", configs.addr);
  // console.log(configs.addr);

  var urlComplete = "/market/history/kline?period=1day&size=200&symbol=btcusdt";

  var objs = {};

  objs.method = "GET";
  console.log(configs.addr);
  objs.addr = configs.addr.replace("https://", "");
  objs.url = urlComplete.split("?")[0];
  objs.params = [];

  var keyPairs = urlComplete.split("?")[1].split("&");
  objs.params = objs.params.concat(keyPairs);
  objs.params.push("AccessKeyId=" + configs.accessKey);
  objs.params.push("SigantureMethod=" + configs.signatureMethod);
  objs.params.push("SignatureVersion=" + configs.signatureVersion);
  objs.params.push("Timestamp=" + new Date().toISOString().split(".")[0]);

  // objs.accessKeyId = configs.accessKey;
  // objs.signatureMethod = configs.signatureMethod;
  // objs.signatureVersion = configs.signatureVersion;
  // objs.timeStamp = new Date();
  var paramsBefore = Sign.listParams(objs.params);

  var strToSign = "";
  strToSign += objs.method + "\n";
  strToSign += objs.addr + "\n";
  strToSign += objs.url + "\n";
  strToSign += paramsBefore.join("&");

  console.log("\nBefore signing");
  console.log(strToSign);

  var strSignature = Sign.signIt(strToSign);

  var newUrl = "";
  newUrl += (objs.url + "?");
  newUrl += paramsBefore.join("&");
  newUrl += ("&Signature=" + QueryString.escape(strSignature));

  console.log("\nnew Url");
  console.log(newUrl);

  this.client.get(newUrl, (err, data) => {
    if (err) {
      console.log("Get error:", err);
      return;
    }
    console.log("Get data:");
    console.log(data);
  });
};
/* GET /v1/account/accounts */
HuobiClient.prototype.getAccount = function () {
  Utils.printYellow("\nTry GET account from server:", configs.addr);
  var urlComplete = "/v1/account/accounts";

  var objs = {};
  objs.method = "GET";
  console.log(configs.addr);
  objs.addr = configs.addr.replace("https://", "");
  objs.url = urlComplete.split("?")[0];
  objs.params = [];

  if (urlComplete.split("?")[1]) {
    var keyPairs = urlComplete.split("?")[1].split("&");
    objs.params = objs.params.concat(keyPairs);
  }
  objs.params.push("AccessKeyId=" + configs.accessKey);
  objs.params.push("SigantureMethod=" + configs.signatureMethod);
  objs.params.push("SignatureVersion=" + configs.signatureVersion);
  objs.params.push("Timestamp=" + new Date().toISOString().split(".")[0]);

  var paramsBefore = Sign.listParams(objs.params);

  var strToSign = "";
  strToSign += objs.method + "\n";
  strToSign += objs.addr + "\n";
  strToSign += objs.url + "\n";
  strToSign += paramsBefore.join("&");
  
  console.log("\nBefore signing");
  console.log(strToSign);

  var strSignature = Sign.signIt(strToSign);

  var newUrl = "";
  newUrl += (objs.url + "?");
  newUrl += paramsBefore.join("&");
  newUrl += ("&Signature=" + QueryString.escape(strSignature));

  Utils.printYellow("\nnew Url");
  console.log(newUrl);

  this.client.get(newUrl, (err, data) => {
    if (err) {
      console.log("Get error:", err);
      return;
    }
    console.log("Get data:");
    console.log(data);
  });
};

module.exports = HuobiClient;
