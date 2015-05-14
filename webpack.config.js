/**
 * webpack.config.js
 *
 * Local development configuration for webpack optimization tool. Used by webpack dev server.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 05/14/15
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
        jquery: "jQuery"
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: "#source-map"
};
