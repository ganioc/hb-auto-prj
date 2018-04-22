"use strict";
// Some readme here
// var HttpClient = require("../HttpClient.js");
var QueryString = require("querystring");
var Utils = require("../../lib/utils.js");
var configs = require("./configs.js");
var HttpClient = require("../HttpClient.js");
var Sign = require("./sign");
var path = require("path");

var utils = new Utils(path.basename(__filename));

function HuobiClient () {
  this.name = "HUOBI_CLIENT";
  this.client = new HttpClient({ hostname: configs.addr });
}
// get something from an Url
HuobiClient.prototype.get = function (url, callback) {
  utils.printYellow("Get --> ", url);

  this.client.get(url, (err, data) => {
    if (err) {
      utils.printRed("Get error:", err);
      callback(err, null);
      return;
    }
    // utils.printGreen("Get data successfully:", data);
    // utils.print(data);
    callback(null, data);
  });
};
HuobiClient.prototype.signUrlGet = function () {
  var objs = {};
  utils.printYellow("signUrlGet");
  objs.method = "GET";
  objs.addr = configs.addr;
  objs.params = [];

  var args = Array.prototype.slice.call(arguments);

  console.log(args);
  objs.url = args[0];

  for (var i = 1; i < args.length; i++) {
    objs.params.push(args[i]);
  }

  // objs.params.push("AccessKeyId=" + configs.accessKey);
  // objs.params.push("SigantureMethod=" + configs.signatureMethod);
  // objs.params.push("SignatureVersion=" + configs.signatureVersion);
  // objs.params.push("Timestamp=" + new Date().toISOString().split(".")[0]);

  var paramsBefore = Sign.escapeParams(objs.params);

  // var newUrl = "";
  var newUrl = (objs.url + "?");
  newUrl += paramsBefore.join("&");
  // newUrl += ("&Signature=" + QueryString.escape(strSignature));

  // utils.printBlue("\nnew Url:", newUrl);
  // console.log(newUrl);

  return newUrl;
};
HuobiClient.prototype.signUrlSignatureGet = function () {
  var objs = {};
  utils.printYellow("signUrlSignatureGet");
  objs.method = "GET";
  objs.addr = configs.addr;
  objs.params = [];

  var args = Array.prototype.slice.call(arguments);

  console.log(args);

  objs.url = args[0];

  for (var i = 1; i < args.length; i++) {
    objs.params.push(args[i]);
  }

  objs.params.push("AccessKeyId=" + configs.accessKey);
  objs.params.push("SigantureMethod=" + configs.signatureMethod);
  objs.params.push("SignatureVersion=" + configs.signatureVersion);
  objs.params.push("Timestamp=" + new Date().toISOString().split(".")[0]);

  var paramsBefore = Sign.escapeParams(objs.params);

  // var strToSign = "";
  var strToSign = objs.method + "\n";
  strToSign += objs.addr + "\n";
  strToSign += objs.url + "\n";
  strToSign += paramsBefore.join("&");

  utils.printBlue("str to sign:");

  // var newUrl = "";
  var newUrl = (objs.url + "?");
  newUrl += paramsBefore.join("&");
  newUrl += ("&Signature=" + Sign.sha256(strToSign));

  // utils.printBlue("\nnew Url:", newUrl);
  // console.log(newUrl);

  return newUrl;
};

// GET /market/history/kline?period=1day&size=200&symbol=btcusdt
HuobiClient.prototype.getMarketHistoryKLine = function (period, size, symbol, callback) {
  var url = "/market/history/kline";
  var paramPeriod = "period=" + period;
  var paramSize = "size=" + size;
  var paramSymbol = "symbol=" + symbol;

  var newUrl = this.signUrlGet(url, paramPeriod, paramSize, paramSymbol);

  this.get(newUrl, callback);
};
// GET /market/detail/merged?symbol=ethusdt
HuobiClient.prototype.getMarketDetailMerged = function (symbol, callback) {
  var url = "/market/detail/merged";
  var paramSymbol = "symbol=" + symbol;

  var newUrl = this.signUrlGet(url, paramSymbol);

  this.get(newUrl, callback);
};
// GET /market/depth?symbol=ethusdt&type=step1
HuobiClient.prototype.getMarketDepth = function (symbol, type, callback) {
  var url = "/market/depth";
  var paramSymbol = "symbol=" + symbol;
  var paramType = "type=" + type;

  var newUrl = this.signUrlGet(url, paramSymbol, paramType);

  this.get(newUrl, callback);
};

// GET /market/trade?symbol=ethusdt */
HuobiClient.prototype.getMarketTrade = function (symbol, callback) {
  var url = "/market/trade";
  var paramSymbol = "symbol=" + symbol;

  var newUrl = this.signUrlGet(url, paramSymbol);

  this.get(newUrl, callback);
};

// GET /market/history/trade?symbol=ethusdt
HuobiClient.prototype.getMarketHistoryTrade = function (symbol, callback) {
  var url = "/market/history/trade";
  var paramSymbol = "symbol=" + symbol;

  var newUrl = this.signUrlGet(url, paramSymbol);

  this.get(newUrl, callback);
};

// GET /market/detail?symbol=ethusdt */
HuobiClient.prototype.getMarketDetail = function (symbol, callback) {
  var url = "/market/detail";
  var paramSymbol = "symbol=" + symbol;

  var newUrl = this.signUrlGet(url, paramSymbol);

  this.get(newUrl, callback);
};

// GET /v1/common/symbols
HuobiClient.prototype.getV1CommonSymbols = function (callback) {
  var url = "/v1/common/symbols";
  var newUrl = this.signUrlGet(url);

  this.get(newUrl, callback);
};
// GET /v1/common/currencys
HuobiClient.prototype.getV1CommonCurrencys = function (callback) {
  var url = "/v1/common/currencys";
  var newUrl = this.signUrlGet(url);

  this.get(newUrl, callback);
};
// GET /v1/common/timestamp */
HuobiClient.prototype.getV1CommonTimestamp = function (callback) {
  var url = "/v1/common/timestamp";
  var newUrl = this.signUrlGet(url);

  this.get(newUrl, callback);
};
// GET /v1/account/accounts
HuobiClient.prototype.getV1AccountAccounts = function (callback) {
  var url = "/v1/account/accounts";
  var newUrl = this.signUrlSignatureGet(url);

  this.get(newUrl, callback);
};
// /v1/common/exchange
HuobiClient.prototype.getV1CommonExchange = function (symbol, callback) {
  var url = "/v1/common/exchange";
  var paramSymbol = "symbol=" + symbol;
  var newUrl = this.signUrlGet(url, paramSymbol);

  this.get(newUrl, callback);
};

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

// /* GET /market/history/kline?period=1day&size=200&symbol=btcusdt */
HuobiClient.prototype.getTry = function () {
  Utils.printYellow("\nTry GET from server:", configs.addr);
  // console.log(configs.addr);

  var urlComplete = "/market/history/kline?period=1min&size=2&symbol=btcusdt";

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
    utils.printGreen("Get data:");
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
