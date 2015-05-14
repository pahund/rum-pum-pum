/**
 * webpack.config.dist.js
 *
 * Production configuration for webpack optimization tool. Used by grunt for optimize job.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 10/01/15
 */
var webpack = require("webpack"),
    HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    progress: false,
    entry: "./js/app.js",
    output: {
        path: __dirname + "/dist/js",
        publicPath: "js/",
        filename: "[chunkhash].bundle.js",
        chunkFilename: "[chunkhash].bundle.js"
    },
    externals: {
        jquery: "jQuery"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({
            template: "index-optimized.html",
            filename: "../index.html"
        })
    ]
};
