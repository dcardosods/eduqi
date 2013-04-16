/*global define */
define(['async!https://maps.googleapis.com/maps/api/js?libraries=visualization&sensor=false!callback'], function () {
    "use strict";

    var parseCEP = function( cep ) {
        return cep.replace( /^(\d{5})(\d{3})$/, '$1-$2' );
    };

    var getLatLng = function ( url, cep, callback ) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: {
                text: cep + ' Brazil',
                f: 'pjson'
            },
            complete: function(xhr, textStatus) {
                //called when complete
            },
            success: function(data, textStatus, xhr) {
                var lat = data.locations[0].feature.geometry.y;
                var ltg = data.locations[0].feature.geometry.x;

                callback( new google.maps.LatLng( lat, ltg ) );
            },
            error: function(xhr, textStatus, errorThrown) {
                //called when there is an error
            }
        });
    };

    var getCep = function ( url, schoolId, callback ) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: {
                idEscola: schoolId
            },
            complete: function(xhr, textStatus) {
                //called when complete
            },
            success: function(data, textStatus, xhr) {
                callback( data );
            },
            error: function(xhr, textStatus, errorThrown) {
                //called when there is an error
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
        addHeatmapOnMap: function ( urlCep, urlLatLng, school, map ) {
            getCep( urlCep, school[0].idEscola, function( cep ) {
                getLatLng( urlLatLng, cep, function( heatmapData ) {
                    var heatmap = new google.maps.visualization.HeatmapLayer({
                        data: [ heatmapData ]
                    });

                    // $('#map-canvas').css('height', '230px');
                    heatmap.setMap( map );
                    //map.setZoom( 7 );
                    map.setCenter( heatmapData );
                });
            });
        }
    }

});
