/*global define */
define(['postal', 'transparency', 'bootstrap'], function ( postal ) {
    "use strict";

    var channel = postal.channel();

    var getInfos = function ( url, id, callback ) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: {
                idEscola: id
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

    var getSearchData = function ( url, callback ) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
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
    }

    var searchData = [];

    channel.subscribe( 'schools.cep', function( data ) {

    });

    channel.subscribe( 'schools.getInfos', function( data ) {
        getInfos( data.url, data.data[0].idEscola, function ( infos ) {
            channel.publish( 'schools.setInfos', infos );
        });
    });

    channel.subscribe( 'schools.setInfos', function ( data ) {
        var collapse1 = {};
        collapse1.infos = [];
        var collapse2 = {};
        collapse2.infos = [];
        var collapse3 = {};
        collapse3.infos = [];
        var collapse4 = {};
        collapse4.infos = [];
        var i = 0;

        $.each(data, function( key, value ) {
            if ( i < 13 ) {
                collapse1.infos.push({
                    questao: value[0],
                    resposta: value[1]
                });
            }
            else if ( i >= 13 && i < 15) {
                collapse2.infos.push({
                    questao: value[0],
                    resposta: value[1]
                });
            }
            else if ( i >= 15 && i < 29) {
                collapse3.infos.push({
                    questao: value[0],
                    resposta: value[1]
                });
            }
            else {
                collapse4.infos.push({
                    questao: value[0],
                    resposta: value[1]
                });
            }

            i++
        });

        $('#collapse-1').render( collapse1, {});
        $('#collapse-2').render( collapse2, {});
        $('#collapse-3').render( collapse3, {});
        $('#collapse-4').render( collapse4, {});
    });

    channel.subscribe( 'schools.getSearchData', function ( data ) {
        getSearchData( data.url, function ( searchData ) {
            channel.publish( 'schools.setSearchData', searchData );
        });
    });

    channel.subscribe( 'schools.setSearchData', function ( data ) {
        searchData = data;

        $("#school-search").typeahead({
            source: function () {
                return _.pluck( data, 'nomeEscola' );
            }
        });
    });

    return {
        setInfos: function ( url, data ) {
            channel.publish( 'schools.getInfos', { url: url, data: data } );
        },
        setSearchData: function ( url ) {
            channel.publish( 'schools.getSearchData', { url: url } );
        },
        getSearchData: function() {
            return searchData;
        }
    }

});
