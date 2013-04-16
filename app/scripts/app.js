/*global define */
define(['maps', 'school', 'transparency', 'highcharts'], function ( maps, school ) {
    'use strict';

    var map = maps.addMapToCanvas( document.getElementById('map-canvas'), 'Brasil' );

    $( document ).on( 'submit', '#search', function( e ) {
        var term = $('#school-search').val();
        var searchData =  school.getSearchData();
        var match = _.where( searchData , {
            nomeEscola: term
        });

        school.setInfos( 'http://192.168.0.121:8080/eduqi-server/questservlet', match );
        maps.addHeatmapOnMap( 'http://192.168.0.121:8080/eduqi-server/cepprovider',
            'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find', match, map );

        $('#school-search').val('');
        $('#school-name'). text( term );
        $('#collapse').removeClass('hide');

        e.preventDefault();
    });

    school.setSearchData('http://192.168.0.121:8080/eduqi-server/cachesearch');
    school.setStatistics('http://192.168.0.121:8080/eduqi-server/probservlet');

    $('#collapse-5').removeClass('hide');
});
