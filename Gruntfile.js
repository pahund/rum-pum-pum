/**
 * Gruntfile
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 03/12/14
 */

(function () {
    "use strict";

    var appRoot = require("app-root-path");

    module.exports = function (grunt) {

        // Project configuration.
        grunt.initConfig({
            clean: [
                "dist"
            ],
            jshint: {
                options: {
                    jshintrc: true
                },
                all: [
                    "js/**/*.js",
                    "!js/lib/**/*.js"
                ]
            },

            jscs: {
                options: {
                    requireMultipleVarDecl: "onevar"
                },
                all: [
                    "js/**/*.js",
                    "!js/lib/**/*.js"
                ]
            },

            copy: {
                dist: {
                    src: [
                        "css/**",
                        "images/**",
                        "sounds/**",
                        "touch-*.png",
                        "favicon.ico"
                    ],
                    dest: "dist",
                    expand: true
                }
            },

            webpack: {
                dist: require(appRoot + "/webpack.config.dist.js")
            }
        });

        require("load-grunt-tasks")(grunt);

        grunt.registerTask("help", function () {
            grunt.log.writeln("grunt help:       displays this message");
            grunt.log.writeln("grunt test:       checks JavaScript code style");
            grunt.log.writeln("grunt dist:       creates folder 'dist' with files optimized for distribution");
            grunt.log.writeln("grunt clean:      deletes downloaded or generated files and directories");
        });

        grunt.registerTask("default", [
            "test"
        ]);

        grunt.registerTask("dist", [
            "webpack:dist",
            "copy:dist"
        ]);

        grunt.registerTask("test", [
            "jshint",
            "jscs"
        ]);
    };
}());

