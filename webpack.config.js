const path = require('path')
const htmls = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
	entry: './src/script.js',
	output: {
		filename: 'all.[chunkhash].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		port: 228
	},
	plugins: [
		new htmls({
			template: './src/index.html'
		}),
		new CleanWebpackPlugin()
	],
	module: {
	  rules: [
	    {
	      test: /\.css$/i,
	      use: ['style-loader', 'css-loader'],
	    },
	  ],
	}
}