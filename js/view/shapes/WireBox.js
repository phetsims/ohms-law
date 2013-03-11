/**
 * Copyright 2002-2013, University of Colorado
 * Static permanent background
 * Author: Vasily Shakhov (Mlearner)
 */

define( [
  'easel',
  'view/shapes/WireBox/CurrentValueBox',
  'view/shapes/WireBox/BatteriesView',
  'view/shapes/WireBox/ResistorView'
], function ( Easel, CurrentValueBox, BatteriesView, ResistorView ) {
  'use strict';
  return function ( model ) {
    var root = new Easel.Container();

    //wire
    var x = 70,
      y = 400,
      w = 550,
      h = 180;
    var wire = new Easel.Shape().setTransform( x, y );
    wire.width = w;
    wire.height = h;
    wire.graphics.setStrokeStyle( 10 ).beginStroke( "#000" ).drawRoundRect( 0, 0, wire.width, wire.height, 4 );
    root.addChild( wire );

    root.addChild( new CurrentValueBox( model, x, y, w, h ) );
    root.addChild( new BatteriesView( model, x, y, w, h ) );
    root.addChild( new ResistorView( model, x, y, w, h ) );

    return root;
  };
} );