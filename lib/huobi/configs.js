"use strict";
// var fs = require("fs");
var obj = require("../secrets/secret-huobi.json");

// const FILE_PATH = "../secrets/secret-huobi.json";

// if (fs.existsSync(FILE_PATH)) {
//   throw new Error(FILE_PATH + " invalid");
// } else {
//   console.log(FILE_PATH + " valid");
// }
// obj = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));

const Info =
  {
    "accessKey": obj.accessKey || "replace_me",
    "secretKey": obj.secretKey || "replace_me",
    "accountId": "replace_me",
    "accountProId": "replace_me",
    "tradePassword": "replace_me",
    "addr": "https://api.huobipro.com",
    "signatureMethod": "HmacSHA256",
    "signatureVersion": "2"
  };

module.exports = Info;
