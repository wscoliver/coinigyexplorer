'use strict';

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _nedb = require('nedb');

var _nedb2 = _interopRequireDefault(_nedb);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _socketclusterClient = require('socketcluster-client');

var _socketclusterClient2 = _interopRequireDefault(_socketclusterClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// bluebird
/*
  Main App
*/

_bluebird2.default.promisifyAll(_nedb2.default.prototype);
// Process Arguments
var rargs = process.argv.slice(2);
var argv = (0, _minimist2.default)(rargs);
var configPath = argv['config'];
_dotenv2.default.config({ path: configPath });
var penv = process.env;

var apiCredentials = {
  'apiKey': penv['X_API_KEY'],
  'apiSecret': penv['X_API_SECRET']
};

var opts = {
  hostname: 'sc-02.coinigy.com',
  port: '443',
  secure: 'true'
};
var SCsocket = _socketclusterClient2.default.connect(opts);

SCsocket.on('connect', function (status) {
  console.log('SCsocket status:');
  console.log(status);
  SCsocket.emit('auth', apiCredentials, function (err, token) {
    if (!err && token) {
      console.log('Auth successful with token');
      console.log(token);
    }
    // Subscribe
    //const bitfinexTrade = 'TRADE-BITS--USD--BTC'
    var bitfinexOrder = 'TRADE-BITS--USD--BTC';
    var gdaxOrder = 'TRADE-GDAX--BTC--USD';

    var bitfinexOrderChan = SCsocket.subscribe(bitfinexOrder);
    var gdaxOrderChan = SCsocket.subscribe(gdaxOrder);

    bitfinexOrderChan.watch(function (bitfinexData) {
      console.log('Bitfinex Order');
      console.log(bitfinexData.length);
      console.log(bitfinexData);
    });
    gdaxOrderChan.watch(function (gdaxData) {
      console.log('Gdax Order');
      console.log(gdaxData.length);
      console.log(gdaxData);
    });
    //
  });
});
//# sourceMappingURL=app.js.map
