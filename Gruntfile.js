/**
 * Gruntfile
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 3 Dec 2014
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
            grunt.log.writeln("grunt dist:       creates folder 'dist' with files optimized for distribution");
            grunt.log.writeln("grunt clean:      deletes downloaded or generated files and directories");
        });

        grunt.registerTask("default", [
            "help"
        ]);

        grunt.registerTask("dist", [
            "webpack:dist",
            "copy:dist"
        ]);
    };
}());

