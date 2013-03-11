/**
 * Copyright 2002-2013, University of Colorado
 * view for vertical slider control
 * Author: Vasily Shakhov (Mlearner)
 */


define( [
  "easel"
], function ( Easel ) {
  'use strict';
  return function ( model, x, y, w, h ) {
    var root = new Easel.Container();

    var resBox = new Easel.Container();
    var wBox = 260,
      hBox = 66;

    var x1 = x + (w - wBox) / 2,
      y1 = y + h - hBox / 2;

    //resistor
    var box = new Easel.Shape().setTransform( x1, y1 );
    box.width = wBox;
    box.height = hBox;
    box.graphics.beginLinearGradientFill( ['#F00', "#FFF", 'rgb(252,252,252)', '#F00'], [0, 0.266, 0.412, 1], 0, 0, 0, hBox );
    box.graphics.beginStroke( 1 );
    box.graphics.drawRect( 0, 0, box.width, hBox );
    resBox.addChild( box );

    //black points in the resistor
    var maxPoints = 250,
      a = (hBox - 3) * (wBox - 3) / maxPoints,    //area per dot
      d = Math.pow( a, 0.5 ), //NN dot separation
      nRows = Math.round( hBox / d ),
      nCols = Math.round( wBox / d ),
      c = 0; //counter

    var points = [];

    for ( var i = 1; i <= nRows; i++ ) {
      for ( var j = 1; j <= nCols; j++ ) {
        var p = new Easel.Shape();
        p.graphics.beginFill( "#000" ).drawCircle( 0, 0, 2 );
        p.x = x1 + j * d - d / 2 + Math.random() * d * 0.7 - 3;
        p.y = y1 + i * d - d / 2 + Math.random() * d * 0.7 - 3;
        points.push( p );
        resBox.addChild( p );
        c++;
      }
    }
    maxPoints = c;

    for ( i = points.length - 1; i > -1; i-- ) {
      var pos = parseInt( Math.random() * i, 10 );
      var tt = points[i];
      points[i] = points[pos];
      points[pos] = tt;
    }

    //observer, set position when changed
    model.resistance.addObserver( function ( val ) {
      var borderNumber = maxPoints * (val) / (model.resistance.MAX);
      for ( var i = 0; i < maxPoints; i++ ) {
        points[i].visible = i < borderNumber;
      }
    } );

    root.addChild( resBox );
    return root;
  };
} );