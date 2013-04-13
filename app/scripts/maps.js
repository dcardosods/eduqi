/*global define */
define(['async!https://maps.googleapis.com/maps/api/js?libraries=visualization&sensor=false!callback'], function () {
    "use strict";

    var parseCEP = function( cep ) {
        return cep.replace( /^(\d{5})(\d{3})$/, '$1-$2' );
    };

    return {
        addMapToCanvas: function( mapCanvas, address ) {
            var options = {
                    zoom: 4,
                    disableDefaultUI: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var geocoder = new google.maps.Geocoder();
            var map = new google.maps.Map( mapCanvas, options );

            geocoder.geocode( { 'address': address }, function( results, status ) {
                if ( status === google.maps.GeocoderStatus.OK ) {
                    map.setCenter( results[0].geometry.location );
                }
            });

            return map;
        },
        addHeatmapOnMap: function ( map ) {
            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: []
            });

            heatmap.setMap( map );
        }
    }

});
