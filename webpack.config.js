module.exports = {
	entry: {
		'demo/dist/js/demo.js' : './demo/src/js/demo.js'
	},
	output: {
		path: require('path').resolve(__dirname),
		filename: '[name]',
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader'
		}]
	}
}
