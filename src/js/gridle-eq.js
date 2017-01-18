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
import cssElementQueries from 'css-element-queries';

/*
 * Define class
 */
class GridleEq {
	constructor() {
		cssElementQueries.ElementQueries.listen();
	}
	update() {
		cssElementQueries.ElementQueries.update();
	}
}

const gridleEq = new GridleEq();
export default gridleEq;
