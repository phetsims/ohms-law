/**
 * Copyright 2002-2013, University of Colorado
 * view for vertical slider control
 * Author: Vasily Shakhov (Mlearner)
 */


define( [
          "easel",
          'view/shapes/WireBox/BatteryView'
        ], function ( Easel, BatteryView ) {
  'use strict';
  return function ( model, x, y, w ) {
    var root = new Easel.Container();

    //max number of batteries
    var maxQ = model.voltage.MAX / 1.5;

    //1 battery width
    var batWidth = 82;

    //x position of start block
    x = x + (w - maxQ * batWidth) / 2;


    //batteries presentation
    var bats = new Array( Math.ceil( maxQ ) );

    for ( var i = 0, l = bats.length; i < l; i++ ) {
      var sx = x + i * batWidth;
      bats[i] = new BatteryView( model, sx, y, batWidth );
      root.addChild( bats[i].view );
    }


    model.voltage.addObserver( function ( val ) {
      for ( var i = 0, l = bats.length; i < l; i++ ) {
        var diff = Math.min( 1.5, val );
        if ( diff !== bats[i].voltage.get() ) {
          bats[i].voltage.set( diff );
        }
        val -= diff;
      }
    } );

    return root;
  };
} );