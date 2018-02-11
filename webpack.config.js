require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');

let config = {
    target: 'node',
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
    ],
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    stats: {
        warnings: false
    }
};

if (process.env.ENABLE_LINT_ON_BUILD) {
    config.module.rules.push({
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader:'eslint-loader',
            options: {
                failOnError: false,
                failOnWarning: false
            }
        }
    });
}


module.exports = config;
