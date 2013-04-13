require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        transparency: '../components/transparency/dist/transparency',
        underscore: '../components/underscore/underscore',
        postal: '../components/postal.js/lib/postal',
        bootstrap: 'vendor/bootstrap',
        highcharts: 'vendor/highcharts',
        async: 'vendor/async'
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

require(['app'], function( app ) {

});
