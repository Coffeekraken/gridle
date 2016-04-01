
/*
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
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    factory();
  } else {
    factory();
  }
})(function() {

  /*
  	 * Define class
   */
  var GridleEq;
  GridleEq = (function() {

    /*
    		 * Init
     */
    function GridleEq() {
      var eq;
      eq = new ElementQueries();
      eq.init();
    }


    /*
    		 * Update
     */

    GridleEq.prototype.update = function() {
      return ElementQueries.update();
    };

    return GridleEq;

  })();
  return window.GridleEq = new GridleEq();
});

//# sourceMappingURL=gridle-eq.js.map
