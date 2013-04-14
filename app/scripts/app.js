/*global define */
define(['maps', 'school', 'transparency', 'highcharts'], function ( maps, school ) {
    'use strict';

    var map = maps.addMapToCanvas( document.getElementById('map-canvas'), 'Brasil' );

    var ceps = [
        '69010120',
        '69073300',
        '69093771',
        '69053660',
        '69048600',
        '69010180'
    ];

    maps.addHeatmapOnMap( map, ceps );

    $( document ).on( 'submit', '#search', function( e ) {
        var term = $('#school-search').val();
        var searchData =  school.getSearchData();
        var match = _.where( searchData , {
            nomeEscola: term
        });

        school.setInfos( 'http://192.168.0.103:8080/eduqi-service/questservlet', match );

        $('#school-search').val('');
        e.preventDefault();
    });

    school.setSearchData('http://192.168.0.103:8080/eduqi-service/cachesearch');
});
