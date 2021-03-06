require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        nunjucks: '../bower_components/nunjucks/browser/nunjucks',
        underscore: '../bower_components/underscore/underscore',
        pubsub: '../bower_components/jquery-tiny-pubsub/src/tiny-pubsub',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        typeahead: '../bower_components/bootstrap3-typeahead/bootstrap3-typeahead',
        async: 'vendor/async'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        typeahead: {
            deps: ['jquery']
        },
        underscore: {
            exports: '_'
        },
        pubsub: {
            deps: ['jquery']
        }
    }
});

require( ['app'], function() {

});
