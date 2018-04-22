"use strict";
var Utils = require("./lib/utils.js");
var path = require("path");
var Async = require("async");
var HuobiClient = require("./lib/huobi/HuobiClient.js");
var utils = new Utils(path.basename(__filename));
var util = require("util");

utils.printGray("********************************************");
utils.printGray("|\\     /||\\     /|(  ___  )(  ___ \\ \\__   __/");
utils.printGray("| )   ( || )   ( || (   ) || (   ) )   ) (");
utils.printGray("| (___) || |   | || |   | || (__/ /    | |");
utils.printGray("|  ___  || |   | || |   | ||  __ (     | | ");
utils.printGray("| (   ) || |   | || |   | || (  \\ \\    | |");
utils.printGray("| )   ( || (___) || (___) || )___) )___) (___");
utils.printGray("|/     \\|(_______)(_______)|/ \\___/ \\_______/");
utils.printGray("*********************************************");

var client = new HuobiClient();

/* Async.series(
  [
    (callback) => {
      utils.printYellow("\n\nTry to get marketHistoryKLine, 1min, 3, btcusdt");
      utils.printMagenta("--------------------------------------------------");
      client.getMarketHistoryKLine("1min", "3", "btcusdt",
        someCallback(callback).bind(this));
    },
    (callback) => {
      utils.printYellow("\n\nTry to get marketDetailMerge, ethusdt");
      utils.printMagenta("--------------------------------------------------");
      client.getMarketDetailMerged("ethusdt",
        someCallback(callback).bind(this));
    },
    (callback) => {
      utils.printYellow("\n\nTry to get marketDepth, ethusdt");
      utils.printMagenta("--------------------------------------------------");
      client.getMarketDepth("ethusdt", "step1",
        someCallback(callback).bind(this));
    },
    (callback) => {
      utils.printYellow("\n\nTry to get marketTrade, eth");
      utils.printMagenta("--------------------------------------------------");
      client.getMarketTrade("btcusdt",
        someCallback(callback));
    },
    (callback) => {
      utils.printYellow("\n\nTry to get marketHistoryTrade, eth");
      utils.printMagenta("--------------------------------------------------");
      client.getMarketHistoryTrade("btcusdt",
        someCallback(callback));
    },
    (callback) => {
      utils.printYellow("\n\nTry to get marketDetail, btcusdt");
      utils.printMagenta("--------------------------------------------------");
      client.getMarketDetail("btcusdt",
        someCallback(callback));
    },
    (callback) => {
      utils.printYellow("\n\nTry to get v1CommonSymbols");
      utils.printMagenta("--------------------------------------------------");
      client.getV1CommonSymbols(
        someCallback(callback));
    },
    (callback) => {
      utils.printYellow("\n\nTry to get v1CommonCurrencys");
      utils.printMagenta("--------------------------------------------------");
      client.getV1CommonCurrencys(
        someCallback(callback));
    },
  ],
  (err) => {
    if (err) {
      utils.printRed(err);
      return;
    }
    utils.printGray("============= Work finished ==============");
  }
); */

Async.series(
  [
    (callback) => {
      utils.printMagenta("--------------------------------------------------");
      utils.printYellow("Try to get v1 common timestamp");
      client.getV1CommonTimestamp(
        someCallback(callback).bind(this));
    },
    (callback) => {
      utils.printMagenta("--------------------------------------------------");
      utils.printYellow("Try to get v1 account accounts");
      client.getV1AccountAccounts(
        someCallback(callback).bind(this));
    },
    (callback) => {
      utils.printMagenta("--------------------------------------------------");
      utils.printYellow("Try to get v1 account balance");
      client.getV1AccountBalance(
        someCallback(callback).bind(this));
    },
    // (callback) => {
    //   utils.printMagenta("--------------------------------------------------");
    //   utils.printYellow("\n\nTry to get v1 common exchange");
    //   client.getV1CommonExchange("usdt",
    //     someCallback(callback).bind(this));
    // },
  ],
  (err) => {
    if (err) {
      utils.printRed(err);
      return;
    }
    utils.printGray("============= Work finished ==============");
  }
);
// The callback for async.series
function someCallback (callback) {
  return (err, data) => {
    if (err) {
      utils.printRed("error:", err);
      return callback(err);
    }
    var obj;
    try {
      obj = JSON.parse(data);
    } catch (e) {
      utils.printRed(e);
      return callback(err);
    }
    utils.printGreen("Got response:");
    console.log(util.inspect(obj,
      {showHidden: false, depth: null}));
    callback(null);
  };
}
