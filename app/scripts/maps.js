/*global define */
define(['async!http://maps.google.com/maps/api/js?sensor=false!callback'], function () {
    "use strict";

    return {
        addMapToCanvas: function( mapCanvas ) {
            var options = {
                    zoom: 4,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var geocoder = new google.maps.Geocoder();
            var map = new google.maps.Map( mapCanvas, options );

            geocoder.geocode( { 'address': 'brasil' }, function( results, status ) {
                if ( status === google.maps.GeocoderStatus.OK ) {
                    map.setCenter( results[0].geometry.location );
                }
                else {
                    mapCanvas.innerHTML = '<p>Não foi possível carregar o mapa para o endereço da loja' +
                        (address.length > 0 ? ': ' + address + '</p>' : '</p>');
                }
            });
        }
    }

});
