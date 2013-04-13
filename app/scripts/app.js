/*global define */
define(['maps', 'school', 'transparency', 'highcharts'], function ( maps, school ) {
    'use strict';

    var map = maps.addMapToCanvas( document.getElementById('map-canvas'), 'Brasil' );
    maps.addHeatmapOnMap( map );

    $( document ).on( 'submit', '#search', function( e ) {
        var term = $( '#school-search' ).val();
        var searchData =  school.getSearchData();
        var match = _.where( searchData , {
            name: term
        });

        school.setInfos( match );

        e.preventDefault();
    });

    school.setSearchData();
});
