const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

// move sources
fse.moveSync('dist/js','js');
fse.moveSync('src/sass','sass');

// clean repo
fse.removeSync('src');
fse.removeSync('.sass-cache');
fse.removeSync('favicon.ico');
fse.removeSync('.DS_Store');
fse.removeSync('scripts');
fse.removeSync('demo');

// update sass files at root
fs.writeFileSync('_index.scss', '@import "sass/gridle";');
fs.writeFileSync('_flex.scss', '@import "sass/gridle-flex";');
