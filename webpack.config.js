/**
 * webpack.config.js
 *
 * Local development configuration for webpack optimization tool. Used by webpack dev server.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 12 Jan 2015
 */
var webpack = require("webpack");

module.exports = {
    entry: [
        "webpack/hot/dev-server",
        "./js/app.js"
    ],
    output: {
        publicPath: "js/",
        filename: "bundle.js"
    },
    externals: {
        jquery: "jQuery",
        pixi: "PIXI"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader?optional=runtime"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader?{rules:[{'no-console':0}]}"
            }
        ],
        postLoaders: [
            {
                test: /worker\/.+\.js$/,
                loader: "worker-loader"
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: "#source-map"
};
