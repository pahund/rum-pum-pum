/**
 * karma.conf.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 19 May 2015
 */
module.exports = function (config) {
    config.set({
        // ... normal karma configuration

        frameworks: [
            "jasmine"
        ],
        files: [
            // all files ending in "_test"
            "test/*-spec.js",
            "test/**/*-spec.js"
            // each file acts as entry point for the webpack configuration
        ],

        preprocessors: {
            // add webpack as preprocessor
            "test/*-spec.js": ["webpack"],
            "test/**/*-spec.js": ["webpack"]
        },

        browsers: [
            "PhantomJS"
        ],

        singleRun: true,

        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
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
                ]
            }
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        }

    });
};
