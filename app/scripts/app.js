/*global define */
define(['maps', 'school', 'transparency', 'highcharts'], function ( maps, school ) {
    'use strict';

    var conf = {
        cachesearch: 'http://ec2-54-232-204-44.sa-east-1.compute.amazonaws.com:8080/eduqi-server/cachesearch',
        probservlet: 'http://ec2-54-232-204-44.sa-east-1.compute.amazonaws.com:8080/eduqi-server/probservlet',
        questservlet: 'http://ec2-54-232-204-44.sa-east-1.compute.amazonaws.com:8080/eduqi-server/questservlet',
        cepprovider: 'http://ec2-54-232-204-44.sa-east-1.compute.amazonaws.com:8080/eduqi-server/cepprovider',
        geocode: 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find'
    }

    var map = maps.addMapToCanvas( document.getElementById('map-canvas'), 'Brasil' );

    $( document ).on( 'submit', '#search', function( e ) {
        var term = $('#school-search').val();
        var searchData =  school.getSearchData();
        var match = _.where( searchData , {
            nomeEscola: term
        });

        school.setInfos( conf.questservlet, match );
        maps.addHeatmapOnMap( conf.cepprovider, conf.geocode, match, map );

        $('#school-search').val('');
        $('#school-name'). text( term );
        $('#collapse').removeClass('hide');

        e.preventDefault();
    });

    school.setSearchData( conf.cachesearch );
    school.setStatistics( conf.probservlet );

    $('#collapse-5').removeClass('hide');
});
