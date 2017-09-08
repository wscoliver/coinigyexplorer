'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var _coinigy = require('./connectors/coinigy');

var _coinigy2 = _interopRequireDefault(_coinigy);

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _BITS = require('./feed/BITS');

var _BITS2 = _interopRequireDefault(_BITS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// bluebird
_bluebird2.default.promisifyAll(_nedb2.default.prototype); /*
                                                             Main App
                                                           */

_bluebird2.default.promisifyAll(_mongodb2.default.MongoClient);
// Internal Libraries

// Process Arguments
var rargs = process.argv.slice(2);
var argv = (0, _minimist2.default)(rargs);
var configPath = argv['config'];
_dotenv2.default.config({ path: configPath });
var penv = process.env;

var apiCredentials = {
  'apiKey': penv['X_API_KEY'],
  'apiSecret': penv['X_API_SECRET']
  // Grab all events and pass to Rx Subject.
};(0, _co2.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var MongoClient, url, db, subj;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          MongoClient = _mongodb2.default.MongoClient;
          url = 'mongodb://localhost:27017/coinigy';
          _context.next = 4;
          return MongoClient.connectAsync(url);

        case 4:
          db = _context.sent;
          subj = new _rx2.default.Subject();

          _coinigy2.default.run(apiCredentials, subj);

          subj.subscribe(function (incoming) {
            if (incoming['topic'] == 'ORDER-BITS--USD--BTC') {
              _BITS2.default['processOrder'](incoming, db);
            }
          });

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));
//# sourceMappingURL=app.js.map
