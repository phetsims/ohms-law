/**
 * Copyright 2002-2013, University of Colorado
 * Block shows Current TextBlock inside WireBlock
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */


define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Strings = require( 'OhmsLawStrings' );
  var Text = require( 'SCENERY/nodes/Text' );
  var WhiteBox = require( 'view/shapes/WhiteBox' );

  function CurrentValueBox( model, x, y, w, h ) {
    Node.call( this, {x: 0, y: 0} );

    var maxW = 0.9 * w;

    //text size and y point of texts
    var textSize = 34;

    //texts parts of full string
    var texts = [
      {
        val: Strings.current,
        color: "red"
      },
      {
        val: " = ",
        color: "black"
      },
      {
        val: "999.9",
        color: "black"
      },
      {
        val: " mA",
        color: "red"
      }
    ];
    var totW = 0,
      textContainer = new Node();
    texts.forEach( function( entry ) {
      entry.view = new Text( entry.val, {'fontFamily': "Verdana", 'fontSize': textSize, fill: entry.color, x: totW, y: 0} );
      textContainer.addChild( entry.view );
      entry.width = entry.view.width;
      entry.right = entry.view.right;
      totW += entry.width;
    } );

    var scale = 1;
    if ( totW > maxW ) {
      scale = maxW / totW;
    }

    var rectW = totW * scale,
      rectH = 70;

    textContainer.scale( scale );
    this.addChild( new WhiteBox( -30, -48, rectW + 60, rectH ) );
    this.addChild( textContainer );
    this.centerX = x + w / 2;
    this.centerY = y + h / 2;

    model.currentProperty.link( function setCurrentText( val ) {
      texts[2].view.text = val.toFixed( 1 );
      texts[2].view.right = texts[2].right;
    } );

  }

  inherit( Node, CurrentValueBox );

  return CurrentValueBox;
} );