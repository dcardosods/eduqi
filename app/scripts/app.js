/*global define */
define(['maps', 'school', 'transparency', 'highcharts'], function ( maps, school ) {
    'use strict';

    maps.addMapToCanvas( document.getElementById('map-canvas'), '76820170' );

    school.setInfos();
});
