/**
 * Copyright 2002-2013, University of Colorado
 * White Block with black border container
 * Author: Vasily Shakhov (Mlearner)
 */


define( [
          "easel"
        ], function ( Easel ) {
  'use strict';
  return function ( x, y, w, h ) {
    var rect = new Easel.Shape();
    rect.graphics.setStrokeStyle( 3 ).beginStroke( "#000" ).beginFill( "#FFF" );
    rect.graphics.drawRoundRect( x, y, w, h, 12 );
    return rect;
  };
} );