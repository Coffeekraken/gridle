module.exports = {
	entry: {
		'demo/dist/js/demo.js' : './demo/src/js/demo.js'
	},
	output: {
		path: '.',
		filename: '[name]',
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader'
		}]
	}
}
