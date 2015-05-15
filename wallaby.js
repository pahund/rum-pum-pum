var wallabyWebpack = require("wallaby-webpack"),
    babel = require("babel"),
    webpackPostprocessor = wallabyWebpack({});

module.exports = function () {
    return {
        files: [
            {
                pattern: "bower_components/jquery/dist/jquery.js",
                instrument: false
            },
            {
                pattern: "bower_components/jasmine-jquery/lib/jasmine-jquery.js",
                instrument: false,
                load: false
            },
            {
                pattern: "js/**/*.js",
                load: false
            }
        ],

        tests: [
            {
                pattern: "test/*.js",
                load: false
            }
        ],

        preprocessors: {
            "**/*.js": file => babel.transform(file.content, {
                sourceMap: true
            })
        },

        postprocessor: webpackPostprocessor,

        bootstrap: function () {
            window.__moduleBundler.loadTests();
        }
    };
};
