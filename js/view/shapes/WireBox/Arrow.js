/**
 * Copyright 2002-2013, University of Colorado
 * Author: Vasily Shakhov (Mlearner)
 * View for Arrow around WireBox
 */

define( [
          "easel"
        ], function ( Easel ) {
  'use strict';
  return function ( model, x, y, rotation ) {
    var line = new Easel.Shape();

    //line params , lineWidth, width, height, arrowtipwidth,arrowtipheight
    var lw = 5,
        w = 30,
        h = 30,
        dw = 3,
        dh = 10;

    line.graphics.setStrokeStyle( 1 ).beginStroke( "black" ).beginFill( "#F00" ).mt( w, 0 ).lt( w, h );
    line.graphics.lt( dh, h ).lt( dh, h + dw ).lt( 0, h - lw / 2 ).lt( dh, h - lw - dw ).lt( dh, h - lw ).lt( w - lw, h - lw ).lt( w - lw, 0 ).lt( w, 0 );
    line.regX = w / 2;
    line.regY = h / 2;
    line.rotation = rotation;
    line.x = x;
    line.y = y;
    return line;
  };
} );