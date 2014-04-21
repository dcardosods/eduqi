/*global define, $, _ */
define(['storage', 'nunjucks', 'pubsub', 'transparency', 'bootstrap', 'typeahead', 'underscore'], function( storage, nunjucks ) {
    'use strict';

    nunjucks.env = new nunjucks.Environment( new nunjucks.WebLoader('./templates') );

    var searchData = [];
    var $schoolSearchInput = $('#school-search');

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

    $.subscribe( 'schools.getInfos', function( e, data ) {
        getInfos( data.url, data.data[0].idEscola, function( infos ) {
            $.publish( 'schools.setInfos', [ infos ] );
        });
    });

    $.subscribe( 'schools.setInfos', function( e, data ) {
        var template = nunjucks.env.getTemplate('school-panel.html')
        var collapse1 = [];
        var collapse2 = [];
        var collapse3 = [];
        var collapse4 = [];
        var i = 0;

        var directives1 = function(answer) {
            var cssClass = ' label-default';
            if ( /bom/i.test( answer ) ) {
                cssClass = ' label-success';
            }
            else if ( /regular/i.test( answer ) ) {
                cssClass = ' label-warning';
            }
            else if ( /ruim/i.test( answer ) ) {
                cssClass = ' label-danger';
            }

            return '<span class="label' + cssClass + '" data-bind="answer">' + answer + '</span>';
        };

        var directives2 = function(answer) {
            var cssClass = ' label-default';
            if ( /bom/i.test( answer ) ) {
                cssClass = ' label-success';
                answer = 'SIM';
            }
            else if ( /regular|inexistente/i.test( answer ) ) {
                cssClass = ' label-danger';
                answer = 'NÃO';
            }

            return '<span class="label' + cssClass + '" data-bind="answer">' + answer + '</span>';
        };

        $.each( data, function( key, value ) {
            if ( i < 13 ) {
                collapse1.push({
                    question: value[0],
                    answer: directives1(value[1])
                });
            }
            else if ( i >= 13 && i < 15) {
                collapse2.push({
                    question: value[0],
                    answer: directives2(value[1])
                });
            }
            else if ( i >= 15 && i < 29) {
                collapse3.push({
                    question: value[0],
                    answer: directives2(value[1])
                });
            }
            else {
                collapse4.push({
                    question: value[0],
                    answer: directives1(value[1])
                });
            }

            i++;
        });

        $('#collapse-1').html( template.render({questions: collapse1}) );
        $('#collapse-2').html( template.render({questions: collapse2}) );
        $('#collapse-3').html( template.render({questions: collapse3}) );
        $('#collapse-4').html( template.render({questions: collapse4}) );
    });

    $.subscribe( 'schools.getSearchData', function( e, data ) {
        $schoolSearchInput.tooltip({
            title: 'Carregando as escolas... Aguarde!',
            placement: 'bottom',
            trigger: 'manual',
            template: '<div class="tooltip"><div class="tooltip-arrow tooltip-danger"></div><div class="tooltip-inner tooltip-danger"></div></div>'
        }).tooltip('show');

        getSearchData( data.url, function( searchData ) {
            $.publish( 'schools.setSearchData', [ searchData ] );
        });
    });

    $.subscribe( 'schools.setSearchData', function( e, data ) {
        searchData = data;

        $schoolSearchInput.typeahead({
            source: function() {
                return _.pluck( data, 'nomeEscola' );
            },
            updater: function (item) {
                window.setTimeout($.proxy(function () {
                    this.$element.parents('form').submit();
                }, this), 1);
                return item;
            }
        });

        $schoolSearchInput.attr('disabled', false).tooltip('destroy').tooltip({
            title: 'Pronto! Já pode iniciar a busca.',
            placement: 'bottom',
            trigger: 'manual',
            template: '<div class="tooltip"><div class="tooltip-arrow tooltip-success"></div><div class="tooltip-inner tooltip-success"></div></div>'
        }).tooltip('show');

        $schoolSearchInput.on('focus', function () {
            $(this).tooltip('destroy');
        });
    });

    $.subscribe( 'schools.getStatistics', function( e, data ) {
        var stored = storage.local( 'schools.statistics' );

        if ( stored ) {
            $.publish( 'schools.setStatistics', [ stored ] );
        }
        else {
            getStatistics( data.url, function( statistics ) {
                $.publish( 'schools.setStatistics', [ statistics ] );
                storage.local( 'schools.statistics', statistics );
            });
        }
    });

    $.subscribe( 'schools.setStatistics', function( e, data ) {
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
            $.publish( 'schools.getInfos', [ { url: url, data: data } ] );
        },
        setSearchData: function( url ) {
            $.publish( 'schools.getSearchData', [ { url: url } ] );
        },
        setStatistics: function( url ) {
            $.publish( 'schools.getStatistics', [ { url: url } ] );
        },
        getSearchData: function() {
            return searchData;
        }
    };

});
