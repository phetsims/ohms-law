/**
 * Copyright 2002-2013, University of Colorado
 * Block shows Current TextBlock inside WireBlock
 * Author: Vasily Shakhov (Mlearner)
 */


define( [
  "easel",
  "i18n!../../../nls/ohms-law-strings",
  "view/shapes/WhiteBox"
], function ( Easel, i18n, WhiteBox ) {

  return function ( model, view ) {
    var root = new Easel.Container();

    //rect around text
    var rectW = 300,
      rectH = 70,
      rectX = view.wire.width / 2 + view.wire.x - rectW / 2,
      rectY = view.wire.height / 2 + view.wire.y - rectH / 2;

    root.addChild( new WhiteBox( rectX, rectY, rectW, rectH ) );

    //text size and y point of texts
    var textSize = 30,
      midY = rectY + rectH / 2 - 1.25 * textSize / 2,
      midX = rectX + rectW / 2;

    //texts parts of full string
    var texts = [
      {
        val: i18n.current,
        color: "red"
      },
      {
        val: " = ",
        color: "black"
      },
      {
        val: "10.4",
        color: "black"
      },
      {
        val: " mA",
        color: "red"
      }
    ];

    //init and transform texts

    var totW = 0;
    texts.forEach( function ( entry ) {
      entry.view = new Easel.Text( entry.val, textSize + "px Verdana", entry.color );
      root.addChild( entry.view );
      entry.width = entry.view.getMeasuredWidth();
      totW += entry.width;
    } );

    var offset = midX - totW / 2;
    texts.forEach( function ( entry ) {
      entry.view.setTransform( offset, midY );
      offset += entry.width;
    } );

    texts[2].view.textAlign = "end";
    texts[2].view.setTransform( texts[2].view.x + texts[2].width, midY );

    //observer, changes view when current value changes
    var setCurrentText = function ( val ) {
      texts[2].view.text = val;
    };

    model.current.addObserver( setCurrentText );
    return root;
  };
} );