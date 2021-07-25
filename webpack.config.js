const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: {
		index: path.resolve(__dirname, 'src', 'index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'images/[hash][ext][query]',
		clean: true,
		publicPath: '/firebase-authentication/dist/',
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.s?css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { publicPath: '' },
					},
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html'),
		}),
		new Dotenv(),
	],
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3000,
		hot: true,
		historyApiFallback: true,
	},
};
