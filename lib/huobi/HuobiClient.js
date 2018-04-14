"use strict";

function HuobiClient () {
  this.name = "HUOBI_CLIENT";
}

HuobiClient.prototype.getTry = function () {
  console.log("Try GET from server");
};

module.exports = HuobiClient;
