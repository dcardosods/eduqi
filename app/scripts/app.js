/*global define */
define(['postal', 'transparency', 'highcharts'], function (postal) {
    'use strict';

    var hello = {
        hello:      'Hello',
        goodbye:    '<i>Goodbye!</i>',
        greeting:   'Howdy!',
        'hi-label': 'Terve!' // Finnish i18n
    };

    $('#transparency').render( hello, {
        goodbye: {
            html: function () {
                return this.goodbye;
            }
        }
    }, { debug: true } );

    var channel = postal.channel();
    console.log(channel);

    return '\'Allo \'Allo!';
});
