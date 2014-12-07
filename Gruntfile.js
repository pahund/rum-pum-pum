/**
 * Gruntfile
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03/12/14
 */(function () {
    "use strict";

    module.exports = function (grunt) {
        var bowerManaged;

        /*
         * Files that are provided by Bower, deployed into lib directories by Grunt
         */
        bowerManaged = {
            js: [
                "jquery/dist/jquery.js",
                "requirejs/require.js",
                "pixi/bin/pixi.dev.js"
            ]
        };

        // Project configuration.
        grunt.initConfig({
            clean: [
                "bower_components",
                "js/lib"
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

            watch: {
                options: {
                    livereload: true
                },
                html: {
                    files: ["index.html"]
                },
                css: {
                    files: ["css/**/*.css"]
                },
                js: {
                    files: [
                        "js/**/*.js",
                        "!js/lib/**/*.js"
                    ],
                    tasks: [
                        "jshint",
                        "jscs"
                    ]
                }
            },

            copy: {
                bower_js: {
                    src: bowerManaged.js,
                    cwd: "bower_components",
                    dest: "js/lib",
                    expand: true,
                    flatten: true
                }
            }
        });

        grunt.loadNpmTasks("grunt-contrib-jshint");
        grunt.loadNpmTasks("grunt-jscs-checker");
        grunt.loadNpmTasks("grunt-contrib-watch");
        grunt.loadNpmTasks("grunt-contrib-clean");
        grunt.loadNpmTasks("grunt-contrib-copy");

        grunt.registerTask("help", function () {
            grunt.log.writeln("grunt help:      displays this message");
            grunt.log.writeln("grunt test:      checks JavaScript code style with JSHint and JSCS");
            grunt.log.writeln("grunt install:   copies libs from bower_components");
            grunt.log.writeln("grunt watch:     checks JavaScript code style when JS files are changed");
            grunt.log.writeln("grunt clean:     deletes downloaded or generated files and directories");
        });

        grunt.registerTask("default", [
            "install",
            "test"
        ]);

        grunt.registerTask("install", [
            "copy"
        ]);

        grunt.registerTask("test", [
            "jshint",
            "jscs"
        ]);
    };
}());

