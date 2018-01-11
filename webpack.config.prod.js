const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const config = require('./webpack.config.js');

config.devtool = '';

config.plugins = [
    new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8
    })
];

module.exports = config;
