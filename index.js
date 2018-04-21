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

Async.series(
  [
    (callback) => {
      utils.printYellow("\n\nTry to get marketHistoryKLine, 1min, 3, btcusdt");
      client.getMarketHistoryKLine("1min", "3", "btcusdt",
        someCallback(callback).bind(this));
    },
    (callback) => {
      utils.printYellow("\n\nTry to get marketDetailMerge, ethusdt");
      client.getMarketDetailMerged("ethusdt",
        someCallback(callback).bind(this));
    },
    (callback) => {
      utils.printYellow("\n\nTry to get marketDepth, ethusdt");
      client.getMarketDepth("ethusdt", "step1",
        someCallback(callback).bind(this));
    },
    (callback) => {
      utils.printYellow("\n\nTry to get marketTrade, ethusdt");
      client.getMarketTrade("ethusdt",
        someCallback(callback));
    },
  ],
  (err) => {
    if (err) {
      utils.printRed(err);
      return;
    }
    utils.printGreen("Work finished");
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
