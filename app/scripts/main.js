require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        transparency: '../components/transparency/dist/transparency',
        underscore: '../components/underscore/underscore',
        postal: '../components/postal.js/lib/postal',
        bootstrap: 'vendor/bootstrap',
        highcharts: 'vendor/highcharts'
    },
    shim: {
        transparency: {
            deps: ['jquery']
        },
        bootstrap: {
            deps: ['jquery']
        },
        highcharts: {
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        }
    }
});

require(['app'], function (app) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});
