/**
 * app-wallaby.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 14 Apr 2015
 */
/* global wallaby, requirejs, jasmine */
wallaby.delayStart();

requirejs.config({
    baseUrl: "/js/lib",

    paths: {
        "app": "../app"
    },

    // ask Require.js to load these files (all our tests)
    deps: wallaby.tests,

    // start test run, once Require.js is done
    callback: function () {
        wallaby.start();
    }
});

