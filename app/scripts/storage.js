/*global define */
define([], function() {
    'use strict';

    return {
        local: function( namespace, data ) {
            if ( arguments.length > 1 ) {
                localStorage.setItem( namespace, JSON.stringify( data ) );
                return data;
            }
            else {
                return JSON.parse( localStorage.getItem( namespace ) );
            }
        }
    };
});
