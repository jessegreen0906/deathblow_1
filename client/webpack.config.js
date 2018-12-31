/*
 * Copyright (c) 2019. Code contained in this file is written by and the intellectual property of Jesse Green except where otherwise noted. Reuse for educational, open source or reference uses is freely available provided reference to the original source is cited with use. Reuse for commercial purposes is prohibited without the consent of the owner.
 */

var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env','@babel/preset-react']
					}
				}
			}
		]
	},
	mode: 'development',
	entry: './src/components/App/App.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'deathblow-client.bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Deathblow'
		})
	]
};