/**
 * Copyright 2002-2013, University of Colorado
 * Battery block
 * Author: Vasily Shakhov (Mlearner)
 */


define( [
  "easel"
], function ( Easel ) {

  return function ( model ) {
    var root = new Easel.Container();

    //texts parts of full string
    //scale - multiplier
    var texts = [
      {
        val: "V",
        scale: 5.5,
        x: 200,
        targetProperty: "voltage",
        color: "#0f0ffb"
      },
      {
        val: "I",
        scale: 0.4,
        x: 420,
        targetProperty: "current",
        color: "red"
      },
      {
        val: "R",
        scale: 0.04,
        x: 500,
        targetProperty: "resistance",
        color: "#0f0ffb"
      }
    ];

    var y = 140;
    texts.forEach( function ( entry ) {
      entry.view = new Easel.Text( entry.val, "14px Courier New bold", entry.color ).setTransform( entry.x, y );
      //entry.view.outline = true;
      entry.view.regX = entry.view.getMeasuredWidth() / 2;
      entry.view.regY = 14 * 1.15 / 2;
      root.addChild( entry.view );
      //TODO text outline?
      model[entry.targetProperty].addObserver( function ( val ) {
        entry.view.scaleX = entry.scale * val;
        entry.view.scaleY = entry.scale * val;
      } );
    } );

    //static text
    var text = new Easel.Text( "=", "140px Courier New bold", "#000" ).setTransform( 300, 60 );
    root.addChild( text );

    return root;
  };
} );