/**
 * Copyright 2002-2013, University of Colorado
 * Static permanent background
 * Author: Vasily Shakhov (Mlearner)
 */

define( [
          'easel',
          'view/shapes/WireBox/CurrentValueBox',
          'view/shapes/WireBox/BatteriesView',
          'view/shapes/WireBox/ResistorView',
          'view/shapes/WireBox/Arrow'
        ], function ( Easel, CurrentValueBox, BatteriesView, ResistorView, Arrow ) {
  'use strict';
  return function ( model ) {
    var root = new Easel.Container();

    var x = 70,
        y = 400,
        w = 550,
        h = 180;

    //arrows
    [new Arrow( model, x + w + 10, y - 10, -90 ), new Arrow( model, x - 10, y + h + 10, 90 )].forEach( function ( entry ) {
      model.current.addObserver( function ( val ) {
        // this fantastic values from idea: 9mA (default) => scale=1, 900 mA = maxScale 100/6 (in original)
        // scale = a * val + b;
        var scale = 17.78 * val / 1000 + 0.84;
        entry.scaleX = scale;
        entry.scaleY = scale;
      } );
      root.addChild( entry );
    } );

    //wire
    var wire = new Easel.Shape().setTransform( x, y );
    wire.width = w;
    wire.height = h;
    wire.graphics.setStrokeStyle( 10 ).beginStroke( "#000" ).drawRoundRect( 0, 0, wire.width, wire.height, 4 );
    root.addChild( wire );

    root.addChild( new CurrentValueBox( model, x, y, w, h ) );
    root.addChild( new BatteriesView( model, x, y, w, h ) );
    var resistorView = new ResistorView( model, x, y, w, h );
    root.addChild( resistorView );

    //part of wire on resistor
    var wirePart = new Easel.Shape().setTransform( resistorView.startX, y+wire.height );
    wirePart.graphics.setStrokeStyle( 10 ).beginStroke( "#000" ).mt(0,0).lineTo(resistorView.height/8,0 );
    root.addChild( wirePart );


    return root;
  };
} );