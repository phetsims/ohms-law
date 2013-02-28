/**
 * Copyright 2002-2013, University of Colorado
 * Static permanent background
 * Author: Vasily Shakhov (Mlearner)
 */

define( [
  'easel'
], function ( Easel ) {

  /**
   * @param w - width of scene
   * @param h - height of scene
   */

  return function ( view ) {
    var root = new Easel.Container();

    //background
    var background = new Easel.Shape();
    background.graphics.beginFill( '#ffffdf' ).rect( 0, 0, view.defaultW, view.defaultH );
    root.addChild( background );

    //wire
    var wire = new Easel.Shape().setTransform(70, 400);
    wire.width = 500;
    wire.height = 180;
    wire.graphics.setStrokeStyle( 10 ).beginStroke( "#000" ).drawRoundRect( 0, 0, wire.width, wire.height, 4 );
    root.addChild( wire );
    view.wire = wire;

    return root;
  };
} );