/*global define, $, google */
define(['async!https://maps.googleapis.com/maps/api/js?libraries=visualization&sensor=false!callback'], function() {
    'use strict';

    var getLatLng = function( url, cep, callback ) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: {
                text: cep + ' Brazil',
                f: 'pjson'
            },
            success: function( data ) {
                var lat = data.locations[0].feature.geometry.y;
                var ltg = data.locations[0].feature.geometry.x;

                callback( new google.maps.LatLng( lat, ltg ) );
            }
        });
    };

    var getCep = function( url, schoolId, callback ) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: {
                idEscola: schoolId
            },
            success: function( data ) {
                callback( data );
            }
        });
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
        addHeatmapOnMap: function( urlCep, urlLatLng, school, map ) {
            getCep( urlCep, school[0].idEscola, function( cep ) {
                getLatLng( urlLatLng, cep, function( heatmapData ) {
                    var heatmap = new google.maps.visualization.HeatmapLayer({
                        data: [ heatmapData ]
                    });

                    heatmap.setMap( map );
                    map.setCenter( heatmapData );
                });
            });
        }
    };

});
