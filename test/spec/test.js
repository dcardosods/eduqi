/*global define, describe, it, expect, assert */
'use strict';
(function () {
    define( [], function() {
        describe( 'Give it some context', function() {
            describe( 'maybe a bit more context here', function() {
                it( 'should run here few assertions', function() {
                    expect( 1 ).to.equal( 1 );
                    assert.equal( 1, 1 );
                });
                it( 'should run here few assertions', function() {
                    expect( 1 ).to.equal( 1 );
                    assert.equal( 1, 1 );
                });
            });
        });
    });
})();
