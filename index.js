"use strict";
var Utils = require("./lib/utils.js");
var path = require("path");

var HuobiClient = require("./lib/huobi/HuobiClient.js");
var utils = new Utils(path.basename(__filename));

var client = new HuobiClient();

utils.printGray();
utils.printGray();

client.getMarketHistoryKLine("1min", "3", "btcusdt", (err, data) => {
  if (err) {
    utils.printRed("error:", err);
    return;
  }
  var obj;
  try {
    obj = JSON.parse(data);
  } catch (e) {
    utils.printRed(e);
  }
  utils.print(JSON.parse(obj));
});

// utils.print("gray");
// utils.printCyan("cyan");
