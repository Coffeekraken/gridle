'use strict';

exports.__esModule = true;

var _cssElementQueries = require('css-element-queries');

var _cssElementQueries2 = _interopRequireDefault(_cssElementQueries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @name 	Gridle-eq.js
                                                                                                                                                           * This little file is a bridge to support the element queries
                                                                                                                                                           * Thanks to [marcj](https://github.com/marcj/css-element-queries) for his wonderful polyfill
                                                                                                                                                           *
                                                                                                                                                           * @example 	js
                                                                                                                                                           * import GridleEq from 'coffeekraken-gridle/js/gridle-eq';
                                                                                                                                                           *
                                                                                                                                                           * @author 	Olivier Bossel <olivier.bossel@gmail.com>
                                                                                                                                                           * @version 	1.0.0
                                                                                                                                                           */


/*
 * Define class
 */
var GridleEq = function () {
  function GridleEq() {
    _classCallCheck(this, GridleEq);

    _cssElementQueries2.default.ElementQueries.listen();
  }
  /**
   * Function to call to update the element queries polyfill
   * @example 	js
   * GridleEq.update();
   * @author 		Olivier Bossel <olivier.bossel@gmail.com>
   */


  GridleEq.prototype.update = function update() {
    _cssElementQueries2.default.ElementQueries.update();
  };

  return GridleEq;
}();

var gridleEq = new GridleEq();
exports.default = gridleEq;