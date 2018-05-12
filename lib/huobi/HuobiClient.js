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

function HuobiClient() {
  this.name = "HUOBI_CLIENT";
  this.client = new HttpClient({ hostname: configs.addr });
}
// You have to use PUT to place an order
HuobiClient.prototype.post = function (url, data, callback) {
  utils.printYellow("Post --> ", url);

  this.client.post(url, data, (err, data) => {
    if (err) {
      utils.printRed("Post error:", err);
      callback(err, null);
      return;
    }
    callback(null, data);
  });
};
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
HuobiClient.prototype.signUrlSignaturePost = function (inUrl) {
  var objs = {};
  utils.printYellow("signUrlSignaturePost");
  objs.method = "POST";
  objs.addr = configs.addr;
  objs.params = [];
  objs.url = inUrl;

  objs.params.push("AccessKeyId=" + configs.accessKey);
  objs.params.push("SignatureMethod=" + configs.signatureMethod);
  objs.params.push("SignatureVersion=" + configs.signatureVersion);
  objs.params.push("Timestamp=" + new Date().toISOString().split(".")[0]);

  var paramsBefore = Sign.escapeParams(objs.params);

  // var strToSign = "";
  var strToSign = objs.method + "\n";
  strToSign += objs.addr + "\n";
  strToSign += objs.url + "\n";
  strToSign += paramsBefore.join("&");

  // utils.printBlue("str to sign:");
  // utils.print(strToSign);

  // var newUrl = "";
  var newUrl = (objs.url + "?");
  newUrl += paramsBefore.join("&");
  newUrl += ("&Signature=" + Sign.sha256(strToSign));

  utils.printBlue("\nnew Url:", newUrl);
  console.log(newUrl);

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
  objs.params.push("SignatureMethod=" + configs.signatureMethod);
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
// GET /v1/account/accounts/{account-id}/balance
HuobiClient.prototype.getV1AccountBalance = function (callback) {
  var url = "/v1/account/accounts/" + configs.accountId + "/balance";

  var newUrl = this.signUrlSignatureGet(url);

  this.get(newUrl, callback);
};

// /* POST /v1/order/orders/place
/* POST /v1/order/orders/place {
   "account-id": "100009",
   "amount": "10.1",
   "price": "100.1",
   "source": "api",
   "symbol": "ethusdt",
   "type": "buy-limit"
 } */
HuobiClient.prototype.postOrderPlace = function (amount, price, symbol, type, callback) {
  var url = "/v1/order/orders/place";

  var newUrl = this.signUrlSignaturePost(url);

  var dataToSend = {
    "account-id": configs.accountId,
    "amount": amount,
    "price": price,
    "source": "api",
    "symbol": symbol,
    "type": type, // "buy-limit"
    // buy-market：市价买
    // sell-market：市价卖
    // buy-limit：限价买
    // sell-limit：限价卖
    // buy-ioc：IOC买单
    // sell-ioc：IOC卖单
  };
  utils.printCyan(dataToSend);
  utils.printCyan(JSON.stringify(dataToSend));

  this.post(newUrl, JSON.stringify(dataToSend), callback);
};
// POST /v1/order/orders/{order-id}/submitcancel 申请撤销一个订单请求
HuobiClient.prototype.postOrderSubmitcancel = function (orderId, callback) {
  var url = "/v1/order/orders/" + orderId + "/submitcancel";
  var newUrl = this.signUrlSignaturePost(url);

  this.post(newUrl, "", callback);
};

// POST /v1/order/orders/batchcancel 批量撤销订单
HuobiClient.prototype.postOrderBatchcancel = function (orderIdLst, callback) {
  var url = "/v1/order/orders/batchcancel";
  var newUrl = this.signUrlSignaturePost(url);

  var dataToSend = {};
  dataToSend["order-ids"] = [];
  for (var i = 0; i < orderIdLst.length; i++) {
    var d = orderIdLst[i];
    dataToSend["order-ids"].push(d);
  }
  utils.printCyan(dataToSend);
  utils.printCyan(JSON.stringify(dataToSend));
  this.post(newUrl, JSON.stringify(dataToSend), callback);
};

// GET /v1/order/orders/{order-id}
HuobiClient.prototype.getOrderOrder = function (orderId, callback) {
  var url = "/v1/order/orders/" + orderId;
  var newUrl = this.signUrlSignatureGet(url);

  this.get(newUrl, callback);
};
// GET /v1/order/orders/{order-id}/matchresults
HuobiClient.prototype.getOrderMatchresults = function (orderId, callback) {
  var url = "/v1/order/orders/" + orderId + "/matchresults";
  var newUrl = this.signUrlSignatureGet(url);
  this.get(newUrl, callback);
};
// GET /v1/order/orders 查询当前委托、历史委托
HuobiClient.prototype.getOrders = function (inSymbol, inStates, callback) {
  var url = "/v1/order/orders";
  var symbol = "symbol=" + inSymbol;
  var states = "states=" + inStates;
  // pre-submitted 准备提交
  // submitted 已提交
  // partial-filled 部分成交
  // partial-canceled 部分成交撤销
  // filled 完全成交
  // canceled 已撤销
  var newUrl = this.signUrlSignatureGet(url, symbol, states);
  this.get(newUrl, callback);
};
// GET /v1/order/matchresults 查询当前成交、历史成交
HuobiClient.prototype.getMatchresults = function (inSymbol, callback) {
  var url = "/v1/order/matchresults";
  var symbol = "symbol=" + inSymbol;

  var newUrl = this.signUrlSignatureGet(url, symbol);
  this.get(newUrl, callback);
};
// 借贷交易API
// 重要：如果使用借贷资产交易
// 请在下单接口/v1/order/orders/place请求参数source中填写‘margin-api’
// 目前仅支持 USDT 交易区和 BTC 交易区部分交易对

// POST /v1/dw/transfer-in/margin 现货账户划入至借贷账户

// POST /v1/dw/transfer-out/margin 借贷账户划出至现货账户

// POST /v1/margin/orders 申请借贷

// POST /v1/margin/orders/{order-id}/repay 归还借贷

// GET /v1/margin/loan-orders 借贷订单

// GET /v1/margin/accounts/balance 借贷账户详情

// 虚拟币提现API
// POST /v1/dw/withdraw/api/create 申请提现虚拟币

// POST /v1/dw/withdraw-virtual/{withdraw-id}/cancel 申请取消提现虚拟币

// GET /v1/query/deposit-withdraw 查询虚拟币充提记录

//







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
