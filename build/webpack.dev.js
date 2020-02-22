const webpackMerge = require('webpack-merge'), commonConfig = require('./webpack.common'),
    path = require('path');


const devConfig = {
    mode: "development",
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8081,
        open: true
    },
    optimization: {
        usedExports: true
    }
};

module.exports = webpackMerge(commonConfig, devConfig);
