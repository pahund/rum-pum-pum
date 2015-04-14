module.exports = function () {
    return {
        files: [
            {
                pattern: "js/lib/require.js",
                instrument: false
            },
            {
                pattern: "js/lib/jquery.js",
                instrument: false
            },
            {
                pattern: "js/lib/jasmine-jquery.js",
                instrument: false,
                load: false
            },
            {
                pattern: "test/app-wallaby.js",
                instrument: false
            },
            {
                pattern: "js/app/**/*.js",
                load: false
            }
        ],

        tests: [
            {
                pattern: "test/specs/**/*.js",
                load: false
            }
        ]
    };
};
