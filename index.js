"use strict";
var Utils = require("./lib/utils.js");

var HuobiClient = require("./lib/huobi/HuobiClient.js");

Utils.printGreen("hello huobi");

var client = new HuobiClient();

client.getAccount();
