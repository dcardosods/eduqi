/*global define, $, _ */
define(['maps', 'school'], function( maps, school ) {
    'use strict';

    var conf = {
        cachesearch: 'http://eduqi.samueldev.com/eduqi-server/cachesearch',
        probservlet: 'http://eduqi.samueldev.com/eduqi-server/probservlet',
        questservlet: 'http://eduqi.samueldev.com/eduqi-server/questservlet',
        cepprovider: 'http://eduqi.samueldev.com/eduqi-server/cepprovider',
        geocode: 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find'
    };

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
