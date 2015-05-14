/**
 * Gruntfile
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 03/12/14
 */

(function () {
    "use strict";

    var appRoot = require("app-root-path"),
        bowerManaged;

    /*
     * Files that are provided by Bower, deployed into lib directories by Grunt
     */
    bowerManaged = {
        js: [
            "jquery/dist/jquery.js",
            "requirejs/require.js",
            "pixi/bin/pixi.js"
        ]
    };

    module.exports = function (grunt) {

        // Project configuration.
        grunt.initConfig({
            clean: [
                "bower_components",
                "js/lib",
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
                bower_js: {
                    src: bowerManaged.js,
                    cwd: "bower_components",
                    dest: "js/lib",
                    expand: true,
                    flatten: true
                },
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
                build: require(appRoot + "/webpack.config.js"),
                dist: require(appRoot + "/webpack.config.dist.js")
            }
        });

        grunt.loadNpmTasks("grunt-contrib-jshint");
        grunt.loadNpmTasks("grunt-jscs-checker");
        grunt.loadNpmTasks("grunt-contrib-clean");
        grunt.loadNpmTasks("grunt-contrib-copy");
        grunt.loadNpmTasks("grunt-webpack");

        grunt.registerTask("help", function () {
            grunt.log.writeln("grunt help:       displays this message");
            grunt.log.writeln("grunt test:       checks JavaScript code style");
            grunt.log.writeln("grunt install:    copies libs from bower_components");
            grunt.log.writeln("grunt dist:       creates folder 'dist' with files optimized for distribution");
            grunt.log.writeln("grunt clean:      deletes downloaded or generated files and directories");
        });

        grunt.registerTask("default", [
            "install",
            "test"
        ]);

        grunt.registerTask("install", [
            "copy:bower_js"
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

