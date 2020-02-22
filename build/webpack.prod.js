const commonConfig = require('./webpack.common'), webpackMerge = require('webpack-merge');


const prodConfig = {
    mode: "production",
    devtool: 'cheap-module-source-map'
};

module.exports = webpackMerge(
    commonConfig, prodConfig
);
