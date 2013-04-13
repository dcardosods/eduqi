/*global define */
define(['postal', 'transparency'], function ( postal ) {
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

    return {
        setInfos: function () {
            channel.publish( 'schools.getInfos' );
        }
    }

});
