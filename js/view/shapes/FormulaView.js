/**
 * Copyright 2002-2013, University of Colorado
 * Battery block
 * Author: Vasily Shakhov (Mlearner)
 */


define( [
          "easel"
        ], function( Easel ) {
  'use strict';
  return function( model ) {
    var root = new Easel.Container();

    //texts parts of full string
    //scale - multiplier
    var texts = [
      {
        val: "V",
        scaleA: 4.5,
        scaleB: 2,
        x: 200,
        targetProperty: "voltage",
        color: "#0f0ffb"
      },
      {
        val: "I",
        scaleA: 0.2,
        scaleB: 0.84,
        x: 420,
        targetProperty: "current",
        color: "red"
      },
      {
        val: "R",
        scaleA: 0.04,
        scaleB: 2,
        x: 560,
        targetProperty: "resistance",
        color: "#0f0ffb"
      }
    ];

    var y = 140;
    texts.forEach( function( entry ) {
      entry.view = new Easel.Text( entry.val, "bold 12px Times New Roman", entry.color ).setTransform( entry.x, y );

      entry.view.regX = entry.view.getMeasuredWidth() / 2;
      entry.view.textBaseline = "middle";
      root.addChild( entry.view );
      model[entry.targetProperty].addObserver( function( val ) {
        entry.view.scaleX = entry.scaleA * val + entry.scaleB;
        entry.view.scaleY = entry.view.scaleX;
      } );
    } );

    //static text
    var text = new Easel.Text( "=", "bold 140px Georgia", "#000" ).setTransform( 300, 140 );
    text.textBaseline = "middle";
    root.addChild( text );

    return root;
  };
} );