// Copyright 2013-2015, University of Colorado Boulder

/**
 * Block shows Current TextBlock inside WireBlock
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var WhiteBox = require( 'OHMS_LAW/ohms-law/view/shapes/WhiteBox' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Util = require( 'DOT/Util' );

  // strings
  var current = require( 'string!OHMS_LAW/current' );
  var currentUnits = require( 'string!OHMS_LAW/currentUnits' );

  // constants
  var FONT = new PhetFont( 34 );
  var SPACING = new Text( '-', { font: FONT } ).width;

  /**
   * @param {OhmsLawModel} model
   * @param width
   * @param height
   * @constructor
   */
  function CurrentValueBox( model, width, height ) {

    Node.call( this );

    var maxTextWidth = 0.9 * width;

    // Create the text string.
    var textContainer = new Node();
    textContainer.addChild( new Text( current, { font: FONT, fill: 'red' } ) );
    textContainer.addChild( new Text( '=', { font: FONT, fill: 'black', left: textContainer.width + SPACING } ) );
    var currentValue = new Text( '999.9', { font: FONT, fill: 'black', left: textContainer.width + SPACING } );
    textContainer.addChild( currentValue );
    textContainer.addChild( new Text( currentUnits, { font: FONT, fill: 'red', left: textContainer.width + SPACING } ) );

    // Scale the text if greater than max allowed width.
    if ( textContainer.width > maxTextWidth ) {
      textContainer.scale( maxTextWidth / textContainer.width );
    }

    // Create the enclosing box and add the text.
    var box = new WhiteBox( 0, 0, width, height );
    this.addChild( box );
    textContainer.centerX = width / 2;
    textContainer.centerY = height / 2;
    box.addChild( textContainer );

    model.currentProperty.link( function setCurrentText( val ) {
      var rightEdgePos = currentValue.right;
      currentValue.text = Util.toFixed( val, 1 );
      currentValue.right = rightEdgePos;
    } );
  }

  return inherit( Node, CurrentValueBox );
} );