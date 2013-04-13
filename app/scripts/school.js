/*global define */
define(['postal', 'transparency', 'bootstrap'], function ( postal ) {
    "use strict";

    var channel = postal.channel();

    var getInfos = function ( id, callback ) {
        callback(
            {
                predio: {
                    telhado: 'teste',
                    porta: 'teste2',
                    janela: 'teste3'
                }
            }
        );
    };

    var getSearchData = function ( id, callback ) {
        callback(
            {
                search: [
                    {
                        id: '1',
                        name: 'teste1'
                    },
                    {
                        id: '2',
                        name: 'teste2'
                    },
                    {
                        id: '3',
                        name: 'test3'
                    }
                ]
            }
        );
    }

    channel.subscribe( 'schools.cep', function( data ) {

    });

    channel.subscribe( 'schools.getInfos', function( data ) {
        getInfos( data, function ( infos ) {
            channel.publish( 'schools.setInfos', infos );
        });
    });

    channel.subscribe( 'schools.setInfos', function ( data ) {
        var hello = data;

        $('#infra-1').render( hello, {

        }, { debug: true } );
    });

    channel.subscribe( 'schools.getSearchData', function( data ) {
        getSearchData( data, function ( searchData ) {
            channel.publish( 'schools.setSearchData', searchData );
        });
    });

    channel.subscribe( 'schools.setSearchData', function ( data ) {
        $("#school-search").typeahead({
            source: function () {
                return _.pluck( data.search, 'name' );
            }
        });
    });

    return {
        setInfos: function () {
            channel.publish( 'schools.getInfos' );
        },
        setSearchData: function () {
            channel.publish( 'schools.getSearchData' );
        }
    }

});
