// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * view formula ohms law
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Matrix3 = require( 'DOT/Matrix3' );

  function FormulaView( model ) {
    var thisNode = this;
    Node.call( this );
    var texts = [
      {
        val: "V",
        scaleA: 4.5,
        scaleB: 2,
        x: 150,
        targetProperty: "voltageProperty",
        color: "#0f0ffb"
      },
      {
        val: "I",
        scaleA: 0.2,
        scaleB: 0.84,
        x: 380,
        targetProperty: "currentProperty",
        color: "red"
      },
      {
        val: "R",
        scaleA: 0.04,
        scaleB: 2,
        x: 560,
        targetProperty: "resistanceProperty",
        color: "#0f0ffb"
      }
    ];
    var y = 140;
    texts.forEach( function viewTexts( entry ) {
      entry.view = new Text( entry.val, {'fontFamily': "Times New Roman", 'fontSize': 12, fontWeight: "bold", fill: entry.color, centerX: entry.x, centerY: y} );
      thisNode.addChild( entry.view );
      model[entry.targetProperty].link( function updateProperty( val ) {
        entry.view.matrix = new Matrix3();
        entry.view.scale( entry.scaleA * val + entry.scaleB );
        entry.view.centerX = entry.x;
        entry.view.centerY = y;
      } );
    } );

    //static text
    var text = new Text( "=", {'fontFamily': "Georgia", 'fontSize': 140, fontWeight: "bold", fill: "#000", centerX: 300, centerY: y} );
    this.addChild( text );
  }

  inherit( Node, FormulaView );

  return FormulaView;
} );