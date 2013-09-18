require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        transparency: '../bower_components/transparency/dist/transparency',
        underscore: '../bower_components/underscore/underscore',
        postal: '../bower_components/postal.js/lib/postal',
        bootstrap: 'vendor/bootstrap',
        async: 'vendor/async'
    },
    shim: {
        transparency: {
            deps: ['jquery']
        },
        bootstrap: {
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        }
    }
});

require( ['app'], function() {

});
