/*global define */
define(['async!http://maps.google.com/maps/api/js?sensor=false!callback'], function () {
    "use strict";

    var parseCEP = function( cep ) {
        return cep.replace( /^(\d{5})(\d{3})$/, '$1-$2' );
    };

    return {
        addMapToCanvas: function( mapCanvas, cep ) {
            var options = {
                    zoom: 17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var geocoder = new google.maps.Geocoder();
            var map = new google.maps.Map( mapCanvas, options );

            geocoder.geocode( { 'address': parseCEP( cep ) }, function( results, status ) {
                if ( status === google.maps.GeocoderStatus.OK ) {
                    map.setCenter( results[0].geometry.location );
                }
            });
        }
    }

});
