/**
 * Copyright 2002-2013, University of Colorado
 * Block shows Current TextBlock inside WireBlock
 * Author: Vasily Shakhov (Mlearner)
 */


define( [
          "easel",
          "OhmsLawStrings",
          "view/shapes/WhiteBox"
        ], function ( Easel, i18n, WhiteBox ) {
  'use strict';
  return function ( model, x, y, w, h ) {
    var root = new Easel.Container();

    var maxW = 0.9 * w;

    //text size and y point of texts
    var textSize = 34;

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
        val: "1004",
        color: "black"
      },
      {
        val: " mA",
        color: "red"
      }
    ];

    //init and transform texts
    var textContainer = new Easel.Container();
    var totW = 0;
    texts.forEach( function ( entry ) {
      entry.view = new Easel.Text( entry.val, textSize + "px Verdana", entry.color ).setTransform( totW, 0 );
      textContainer.addChild( entry.view );
      entry.width = entry.view.getMeasuredWidth();
      totW += entry.width;
    } );

    //scale
    var scale = 1;
    if ( totW > maxW ) {
      scale = maxW / totW;
    }

    texts[2].view.textAlign = "end";
    texts[2].view.setTransform( texts[2].view.x + texts[2].width, 0 );

    //observer, changes view when current value changes
    var setCurrentText = function ( val ) {
      texts[2].view.text = val;
    };

    //rect around text

    var rectW = totW * scale,
        rectH = 70,
        rectX = w / 2 + x - rectW / 2,
        rectY = h / 2 + y - rectH / 2;

    var midY = rectY + rectH / 2 - scale * 1.25 * textSize / 2,
        midX = rectX + rectW / 2,
        offset = midX - scale * totW / 2;

    root.addChild( new WhiteBox( rectX - 30, rectY, rectW + 60, rectH ) );
    root.addChild( textContainer );
    textContainer.setTransform( offset, midY, scale, scale );
    model.current.addObserver( setCurrentText );
    return root;
  };
} );