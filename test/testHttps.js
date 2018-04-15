"use strict";
var Utils = require("../lib/utils");
var HttpClient = require("../lib/HttpClient");

var client = new HttpClient({ hostname: "https://www.baidu.com" });

client.get("/", (err, data) => {
  if (err) {
    console.log("get / error:", err);
    return;
  }
  Utils.printYellow("Test get from baidu");
  console.log(data.toString());
  Utils.printYellow("--- End of Test get from baidu ---");
});
