/*global define */
define(['postal', 'transparency', 'bootstrap'], function ( postal ) {
    "use strict";

    var channel = postal.channel();

    var getInfos = function ( id, callback ) {
        if ( id == '1' ) {
            callback(
                {
                    'table-type-1': {
                        'table-item-1': 'teste1',
                        'table-result-1': 'Bom',
                        'table-item-2': 'teste1',
                        'table-result-2': 'Ruim',
                        'table-item-3': 'teste1',
                        'table-result-3': 'Regular'
                    }
                }
            );
        }
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
        getInfos( data[0].idEscola, function ( infos ) {
            channel.publish( 'schools.setInfos', infos );
        });
    });

    channel.subscribe( 'schools.setInfos', function ( data ) {
        var hello = data;

        $('#collapse-1').render( hello, {

        }, { debug: true } );
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
        setInfos: function ( data ) {
            channel.publish( 'schools.getInfos', data );
        },
        setSearchData: function ( url ) {
            channel.publish( 'schools.getSearchData', { url: url } );
        },
        getSearchData: function() {
            return searchData;
        }
    }

});
