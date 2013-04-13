/*global define */
define(['postal', 'transparency', 'bootstrap'], function ( postal ) {
    "use strict";

    var channel = postal.channel();

    var getInfos = function ( id, callback ) {
        if ( id == '1' ) {
            callback(
                {
                    predio: {
                        telhado: 'teste1',
                        porta: 'teste1',
                        janela: 'teste1'
                    }
                }
            );
        }
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

    var searchData = [  ];

    channel.subscribe( 'schools.cep', function( data ) {

    });

    channel.subscribe( 'schools.getInfos', function( data ) {
        getInfos( data[0].id, function ( infos ) {
            channel.publish( 'schools.setInfos', infos );
        });
    });

    channel.subscribe( 'schools.setInfos', function ( data ) {
        var hello = data;

        $('#infra-1').render( hello, {

        }, { debug: true } );
    });

    channel.subscribe( 'schools.getSearchData', function ( data ) {
        getSearchData( data, function ( searchData ) {
            channel.publish( 'schools.setSearchData', searchData );
        });
    });

    channel.subscribe( 'schools.setSearchData', function ( data ) {
        searchData = data.search;

        $("#school-search").typeahead({
            source: function () {
                return _.pluck( data.search, 'name' );
            }
        });
    });

    return {
        setInfos: function ( data ) {
            channel.publish( 'schools.getInfos', data );
        },
        setSearchData: function () {
            channel.publish( 'schools.getSearchData' );
        },
        getSearchData: function() {
            return searchData;
        }
    }

});
