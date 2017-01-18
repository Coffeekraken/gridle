'use strict';

exports.__esModule = true;

var _cssElementQueries = require('css-element-queries');

var _cssElementQueries2 = _interopRequireDefault(_cssElementQueries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
                                                                                                                                                           * Gridle-eq.js
                                                                                                                                                           *
                                                                                                                                                           * This little file is a bridge to support the element queries
                                                                                                                                                           * @copyright marcj https://github.com/marcj/css-element-queries
                                                                                                                                                           *
                                                                                                                                                           * @author 	Olivier Bossel <olivier.bossel@gmail.com>
                                                                                                                                                           * @created 	20.05.14
                                                                                                                                                           * @updated 	09.10.15
                                                                                                                                                           * @version 	1.0.0
                                                                                                                                                           */


/*
 * Define class
 */
var GridleEq = function () {
  function GridleEq() {
    _classCallCheck(this, GridleEq);

    console.log(_cssElementQueries2.default);
    _cssElementQueries2.default.ElementQueries.listen();
  }

  GridleEq.prototype.update = function update() {
    console.log('update', _cssElementQueries2.default.ElementQueries);
    _cssElementQueries2.default.ElementQueries.update();
  };

  return GridleEq;
}();

var gridleEq = new GridleEq();
exports.default = gridleEq;