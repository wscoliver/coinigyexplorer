'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nedb = require('nedb');

var _nedb2 = _interopRequireDefault(_nedb);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _socketclusterClient = require('socketcluster-client');

var _socketclusterClient2 = _interopRequireDefault(_socketclusterClient);

var _products = require('../products');

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// bluebird
/*
  Main App
*/

_bluebird2.default.promisifyAll(_nedb2.default.prototype);

var opts = {
  hostname: 'sc-02.coinigy.com',
  port: '443',
  secure: 'true'
};

var dataConnect = function dataConnect(apiCredentials, socketPipe) {
  var SCsocket = _socketclusterClient2.default.connect(opts);

  SCsocket.on('connect', function (status) {
    SCsocket.emit('auth', apiCredentials, function (err, token) {
      if (!err && token) {}
      _products.topics.forEach(function (topic) {
        var chan = SCsocket.subscribe(topic);
        chan.watch(function (mesg) {
          var payload = {
            topic: topic,
            mesg: mesg
          };
          socketPipe.onNext(payload);
        });
      });
    });
  });
};
var run = function run(apiCredentials, dataPipe) {
  var socketPipe = new _rx2.default.Subject();
  dataConnect(apiCredentials, socketPipe);
  socketPipe.subscribe(function (incoming) {
    dataPipe.onNext(incoming);
  });
};
exports.default = {
  dataConnect: dataConnect,
  run: run
};
//# sourceMappingURL=coinigy.js.map
