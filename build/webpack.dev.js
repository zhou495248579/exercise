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
        usedExports: true,
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name:true,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,

                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,

                }
            }
        }
    }
};

module.exports = webpackMerge(commonConfig, devConfig);
