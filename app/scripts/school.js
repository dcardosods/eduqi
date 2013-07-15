/*global define, $, _ */
define(['storage', 'postal', 'transparency', 'bootstrap'], function( storage, postal ) {
    'use strict';

    var channel = postal.channel();

    var getInfos = function( url, id, callback ) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            data: {
                idEscola: id
            },
            success: function( data ) {
                callback( data );
            }
        });
    };

    var getSearchData = function( url, callback ) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function( data ) {
                callback( data );
            }
        });
    };

    var getStatistics = function( url, callback ) {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function( data ) {
                callback( data );
            }
        });
    };

    var searchData = [];

    channel.subscribe( 'schools.getInfos', function( data ) {
        getInfos( data.url, data.data[0].idEscola, function( infos ) {
            channel.publish( 'schools.setInfos', infos );
        });
    });

    channel.subscribe( 'schools.setInfos', function( data ) {
        var collapse1 = {};
        collapse1.infos = [];
        var collapse2 = {};
        collapse2.infos = [];
        var collapse3 = {};
        collapse3.infos = [];
        var collapse4 = {};
        collapse4.infos = [];
        var i = 0;
        var directives = [];

        directives[0] = {
            infos: {
                answer: {
                    html: function() {
                        var answer = this.answer;
                        var cssClass = '';
                        if ( /bom/i.test( answer ) ) {
                            cssClass = ' label-success';
                        }
                        else if ( /regular/i.test( answer ) ) {
                            cssClass = ' label-warning';
                        }
                        else if ( /ruim/i.test( answer ) ) {
                            cssClass = ' label-important';
                        }

                        return '<span class="label' + cssClass + '" data-bind="answer">' + answer + '</span>';
                    }
                }
            }
        };

        directives[1] = {
            infos: {
                answer: {
                    html: function() {
                        var answer = this.answer;
                        var cssClass = '';
                        if ( /bom/i.test( answer ) ) {
                            cssClass = ' label-success';
                            answer = 'SIM';
                        }
                        else if ( /regular|inexistente/i.test( answer ) ) {
                            cssClass = ' label-important';
                            answer = 'NÃO';
                        }

                        return '<span class="label' + cssClass + '" data-bind="answer">' + answer + '</span>';
                    }
                }
            }
        };

        $.each( data, function( key, value ) {
            if ( i < 13 ) {
                collapse1.infos.push({
                    question: value[0],
                    answer: value[1]
                });
            }
            else if ( i >= 13 && i < 15) {
                collapse2.infos.push({
                    question: value[0],
                    answer: value[1]
                });
            }
            else if ( i >= 15 && i < 29) {
                collapse3.infos.push({
                    question: value[0],
                    answer: value[1]
                });
            }
            else {
                collapse4.infos.push({
                    question: value[0],
                    answer: value[1]
                });
            }

            i++;
        });

        $('#collapse-1').render( collapse1, directives[0] );
        $('#collapse-2').render( collapse2, directives[1] );
        $('#collapse-3').render( collapse3, directives[1] );
        $('#collapse-4').render( collapse4, directives[0] );
    });

    channel.subscribe( 'schools.getSearchData', function( data ) {
        getSearchData( data.url, function( searchData ) {
            channel.publish( 'schools.setSearchData', searchData );
        });
    });

    channel.subscribe( 'schools.setSearchData', function( data ) {
        searchData = data;

        $('#school-search').typeahead({
            source: function() {
                return _.pluck( data, 'nomeEscola' );
            }
        });
    });

    channel.subscribe( 'schools.getStatistics', function( data ) {
        var stored = storage.local( 'schools.statistics' );

        if ( stored ) {
            channel.publish( 'schools.setStatistics', stored );
        }
        else {
            getStatistics( data.url, function( statistics ) {
                channel.publish( 'schools.setStatistics', statistics );
                storage.local( 'schools.statistics', statistics );
            });
        }
    });

    channel.subscribe( 'schools.setStatistics', function( data ) {
        var collapse6 = {};
        collapse6.infos = [];
        var collapse7 = {};
        collapse7.infos = [];
        var collapse8 = {};
        collapse8.infos = [];
        var collapse9 = {};
        collapse9.infos = [];
        var i = 0;
        var directives = [];

        directives[0] = {
            infos: {
                bom: {
                    text: function() {
                        return this.bom + ' %';
                    }
                },
                regular: {
                    text: function() {
                        return this.regular + ' %';
                    }
                },
                ruim: {
                    text: function() {
                        return this.ruim + ' %';
                    }
                },
                inexistente: {
                    text: function() {
                        return this.inexistente + ' %';
                    }
                }
            }
        };

        directives[1] = {
            infos: {
                sim: {
                    text: function() {
                        return this.bom + ' %';
                    }
                },
                nao: {
                    text: function() {
                        return ( Math.floor( (this.regular + this.inexistente) * 100 ) / 100 ) + ' %';
                    }
                }
            }
        };

        $.each( data, function( key, value ) {
            if ( i < 13 ) {
                collapse6.infos.push( value );
            }
            else if ( i >= 13 && i < 15) {
                collapse7.infos.push( value );
            }
            else if ( i >= 15 && i < 29) {
                collapse8.infos.push( value );
            }
            else {
                collapse9.infos.push( value );
            }

            i++;
        });

        $('#collapse-6').render( collapse6, directives[0] );
        $('#collapse-7').render( collapse7, directives[1] );
        $('#collapse-8').render( collapse8, directives[1] );
        $('#collapse-9').render( collapse9, directives[0] );
    });

    return {
        setInfos: function( url, data ) {
            channel.publish( 'schools.getInfos', { url: url, data: data } );
        },
        setSearchData: function( url ) {
            channel.publish( 'schools.getSearchData', { url: url } );
        },
        setStatistics: function( url ) {
            channel.publish( 'schools.getStatistics', { url: url } );
        },
        getSearchData: function() {
            return searchData;
        }
    };

});
