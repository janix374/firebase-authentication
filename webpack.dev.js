const common = require('./webpack.config');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
	mode: 'development',
	target: 'web',
	devtool: 'source-map',
});
