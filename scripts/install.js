const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

let a = false;

if (process.platform === 'win32') {
	if (process.cwd().match(/node_modules/)) { a = true };
} else if (process.env.PWD.match(/node_modules/)) { a = true }

if (a){
		// move sources
		fse.removeSync('js');
		fse.moveSync('dist/js','js');
		fse.removeSync('sass');
		fse.moveSync('src/sass','sass');

		// clean repo
		fse.removeSync('src');
		fse.removeSync('dist');
		fse.removeSync('.sass-cache');
		fse.removeSync('favicon.ico');
		fse.removeSync('.DS_Store');
		fse.removeSync('scripts');
		fse.removeSync('demo');

		// update sass files at root
		fs.writeFileSync('_index.scss', '@import "sass/gridle";');
		fs.writeFileSync('_flex.scss', '@import "sass/gridle-flex";');
}
