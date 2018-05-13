'use strict';

var path = require('path');
var Utils = require('./utils.js');
var utils = new Utils(path.basename(__filename));
var util = require('util');

function TaskClient (client, symbol) {
  this._client = client;
  this._symbol = symbol;
  this._interval = 10000; // 5 seconds
}
TaskClient.prototype.fetchHistory = function () {
  this._client.getMarketHistoryKLine('5min', '1', this._symbol,
    (err, data) => {
      if (err) {
        return;
      }
      var obj;
      try {
        obj = JSON.parse(data);
      } catch (e) {
        utils.printRed(e);
        return;
      }
      utils.printGray(util.inspect(obj,
        { showHidden: false, depth: null }));
    }
  );
};
TaskClient.prototype.run = function () {
  var that = this;
  setInterval(() => {
    utils.printMagenta('\ntask get kline');
    that.fetchHistory();
  }, this._interval);
};

// export TaskClient;
module.exports.TaskClient = TaskClient;
