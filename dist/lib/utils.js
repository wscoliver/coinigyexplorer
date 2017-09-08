'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var clone = function clone(x) {
  return JSON.parse((0, _stringify2.default)(x));
};
var stry = function stry(x) {
  return (0, _stringify2.default)(x);
};

var getDay = function getDay() {
  var now = _momentTimezone2.default.utc();
  var tradingDT = now.tz('America/Chicago');
  if (tradingDT.hours() >= 17) {
    // Add One
    tradingDT.add(1, 'day');
  }
  var output = tradingDT.format('YYYYMMDD');
  return output;
};

exports.default = {
  clone: clone,
  stry: stry,
  getDay: getDay
};
//# sourceMappingURL=utils.js.map
