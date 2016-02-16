// Copyright 2016, University of Colorado Boulder

/**
 * view formula ohms law
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  var voltageSymbolString = require( 'string!OHMS_LAW/voltageSymbol' );
  var currentSymbolString = require( 'string!OHMS_LAW/currentSymbol' );
  var resistanceSymbolString = require( 'string!OHMS_LAW/resistanceSymbol' );

  /**
   * @param {OhmsLawModel} model
   * @constructor
   */
  function FormulaView( model ) {

    var thisNode = this;
    Node.call( this );

    var texts = [
      {
        val: voltageSymbolString,
        scaleA: 4.5,
        scaleB: 2,
        x: 150,
        targetProperty: 'voltageProperty',
        color: '#0f0ffb'
      },
      {
        val: currentSymbolString,
        scaleA: 0.2,
        scaleB: 0.84,
        x: 380,
        targetProperty: 'currentProperty',
        color: 'red'
      },
      {
        val: resistanceSymbolString,
        scaleA: 0.04,
        scaleB: 2,
        x: 560,
        targetProperty: 'resistanceProperty',
        color: '#0f0ffb'
      }
    ];
    var centerY = 160; // empirically determined
    texts.forEach( function viewTexts( entry ) {
      // centered text node, so we just have to adjust scale dynamically
      var textNode = new Text( entry.val, {
        font: new PhetFont( { family: 'Times New Roman', size: 12, weight: 'bold' } ),
        fill: entry.color,
        centerX: 0,
        centerY: 0
      } );
      entry.view = new Node( { children: [ textNode ] } );
      thisNode.addChild( entry.view );
      model[ entry.targetProperty ].link( function updateProperty( val ) {
        // performance TODO: consider not updating the matrix if it hasn't changed (if entry.x, entry.scaleA, and entry.scaleB haven't changed)
        // since it would potentially reduce the area of SVG that gets repainted (may be browser-specific)
        entry.view.matrix = Matrix3.translation( entry.x, centerY )
          .timesMatrix( Matrix3.scale( entry.scaleA * val + entry.scaleB ) );
      } );
    } );

    //static text
    var text = new Text( '=', {
      font: new PhetFont( { family: 'Times New Roman', size: 140, weight: 'bold' } ),
      fill: '#000',
      centerX: 300,
      centerY: centerY
    } );
    this.addChild( text );
  }

  return inherit( Node, FormulaView );
} );
