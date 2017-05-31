/**
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
import cssElementQueries from 'css-element-queries';

/*
 * Define class
 */
class GridleEq {
	constructor() {
		cssElementQueries.ElementQueries.listen();
	}
	/**
	 * Function to call to update the element queries polyfill
	 * @example 	js
	 * GridleEq.update();
	 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
	 */
	update() {
		cssElementQueries.ElementQueries.update();
	}
}

const gridleEq = new GridleEq();
export default gridleEq;
