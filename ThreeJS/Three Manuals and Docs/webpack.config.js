const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', '/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".js"],
        alias: {
            '@libs': path.join(__dirname, 'libs')
        }
    },
    devServer: {
        compress: true,
        port: 5000
    }
};
