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
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        compress: true,
        port: 5000,
        host : '192.168.1.4'
    }
};
