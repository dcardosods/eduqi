/*global define */
define(['postal'], function ( postal ) {
    "use strict";

    var channel = postal.channel();

    channel.subscribe( 'schools.cep', function( data ) {

    });

    return {

    }

});
