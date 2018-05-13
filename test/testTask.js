'use strict';

var TaskClient = require('../lib/TaskClient.js').TaskClient;
var path = require('path');
var Utils = require('../lib/utils.js');
var utils = new Utils(path.basename(__filename));
var HuobiClient = require('../lib/huobi/HuobiClient.js');

utils.printGreen('=======================');
utils.printGreen('   _            _    ');
utils.printGreen('  | |_ __ _ ___| | __');
utils.printGreen('  | __/ _` / __| |/ /');
utils.printGreen('  | || (_| \\__ \\   < ');
utils.printGreen('   \\__\\__,_|___/_|\\_\\');
utils.printGreen('');
utils.printGreen('=======================\n');

var client = new HuobiClient();
var task1 = new TaskClient(client, 'ethusdt');

task1.run();
