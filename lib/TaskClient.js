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
  this._client.getMarketHistoryKLine('5min', '5', this._symbol,
    (err, data) => {
      if (err) {
        return;
      }
      utils.printGray(util.inspect(data,
        { showHidden: false, depth: null }));
    }
  );
};
TaskClient.prototype.run = function () {
  var that = this;
  setInterval(() => {
    utils.printMagenta('task get kline');
    that.fetchHistory();
  }, this._interval);
};

// export TaskClient;
module.exports.TaskClient = TaskClient;
