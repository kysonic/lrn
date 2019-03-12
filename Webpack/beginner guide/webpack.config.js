const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname,'./src/app.js'),
    output: {
        path: path.resolve(__dirname,'./src'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, './src'),
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        ]
    }
};