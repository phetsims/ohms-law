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
      // centered text node, so we just have to adjust scale dynamically
      var textNode = new Text( entry.val, {'fontFamily': "Times New Roman", 'fontSize': 12, fontWeight: "bold", fill: entry.color, centerX: 0, centerY: 0} );
      entry.view = new Node( { children: [textNode] } );
      thisNode.addChild( entry.view );
      model[entry.targetProperty].link( function updateProperty( val ) {
        // performance TODO: consider not updating the matrix if it hasn't changed (if entry.x, entry.scaleA, and entry.scaleB haven't changed)
        // since it would potentially reduce the area of SVG that gets repainted (may be browser-specific)
        entry.view.matrix = Matrix3.translation( entry.x, y )
                                   .timesMatrix( Matrix3.scale( entry.scaleA * val + entry.scaleB ) );
      } );
    } );

    //static text
    var text = new Text( "=", {'fontFamily': "Georgia", 'fontSize': 140, fontWeight: "bold", fill: "#000", centerX: 300, centerY: y} );
    this.addChild( text );
  }

  inherit( Node, FormulaView );

  return FormulaView;
} );
