const wallabyWebpack = require("wallaby-webpack"),
    babel = require("babel"),
    webpackPostprocessor = wallabyWebpack();

module.exports = () => {
    return {
        files: [
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
