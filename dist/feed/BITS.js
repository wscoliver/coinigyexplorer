'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../lib/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processOrder = function processOrder(incoming, db) {
  var topic = incoming['topic'];
  var mesg = incoming['mesg'];
  var nowDay = _utils2.default.getDay();
  var collectionName = nowDay + ':' + topic;
  var collection = db.collection(collectionName);
  var bidMap = {};
  var askMap = {};
  console.log(mesg.length);
  mesg.forEach(function (row) {
    console.log('Px: ' + row['price'] + ' Side: ' + row['ordertype']);
    var px = Math.floor(row['price'] * 10);
    var orderSide = row['ordertype'];
    var qty = Math.floor(row['quantity'] * 10000);
    if (qty > 0) {

      if (orderSide == 'Sell') {
        if (bidMap.hasOwnProperty(px)) {
          var prevList = bidMap[px];
          prevList.unshift([px, qty]);
        } else {
          bidMap[px] = [[px, qty]];
        }
      } else {
        console.log([px, qty]);
        if (askMap.hasOwnProperty(px)) {
          var _prevList = askMap[px];
          _prevList.unshift([px, qty]);
        } else {
          askMap[px] = [[px, qty]];
        }
      }
    }
  });
  console.log('bidMap');
  console.log(bidMap);
  console.log('askMap');
  console.log(askMap);
};
var processTrade = function processTrade(mesg, db) {
  console.log(mesg);
};
exports.default = {
  processOrder: processOrder,
  processTrade: processTrade
};
//# sourceMappingURL=BITS.js.map
