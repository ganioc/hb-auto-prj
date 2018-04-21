"use strict";
var Utils = require("./lib/utils.js");
var path = require("path");
var Async = require("async");
var HuobiClient = require("./lib/huobi/HuobiClient.js");
var utils = new Utils(path.basename(__filename));

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

// utils.printYellow("\n\nTry to get marketHistoryKLine, 1min, 3, btcusdt");
// client.getMarketHistoryKLine("1min", "3", "btcusdt", (err, data) => {
//   if (err) {
//     utils.printRed("error:", err);
//     return;
//   }
//   var obj;
//   try {
//     obj = JSON.parse(data);
//   } catch (e) {
//     utils.printRed(e);
//     return;
//   }
//   utils.printGreen("Got response:");
//   console.log(obj);
// });

Async.series(
  [
    // (callback) => {
    //   utils.printYellow("\n\nTry to get marketHistoryKLine, 1min, 3, btcusdt");
    //   client.getMarketHistoryKLine("1min", "3", "btcusdt", (err, data) => {
    //     if (err) {
    //       utils.printRed("error:", err);
    //       return callback(err);
    //     }
    //     var obj;
    //     try {
    //       obj = JSON.parse(data);
    //     } catch (e) {
    //       utils.printRed(e);
    //       return callback(err);
    //     }
    //     utils.printGreen("Got response:");
    //     console.log(obj);
    //     callback(null);
    //   });
    // },
    (callback) => {
      utils.printYellow("\n\nTry to get marketMerge");
      client.getMarketDetailMerged("ethusdt", (err, data) => {
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
        console.log(obj);
        callback(null);
      });
    }
  ],
  (err) => {
    if (err) {
      utils.printRed(err);
      return;
    }
    utils.printGreen("Work finished");
  }
);

// utils.print("gray");
// utils.printCyan("cyan");
