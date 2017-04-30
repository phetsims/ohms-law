// Copyright 2016, University of Colorado Boulder

/**
 * Block shows Current TextBlock inside WireBlock
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var Panel = require( 'SUN/Panel' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var currentString = require( 'string!OHMS_LAW/current' );
  var currentUnitsString = require( 'string!OHMS_LAW/currentUnits' );

  // constants
  var FONT = new PhetFont( 34 );
  var SPACING = new Text( '-', { font: FONT } ).width;
  var MAX_TEXT_WIDTH = 0.63 * OhmsLawConstants.WIRE_WIDTH;

  /**
   * @param {Property.<number>} currentProperty
   * @constructor
   */
  function ReadoutPanel( currentProperty ) {

    // Create the text string.
    var textContainer = new Node();
    textContainer.addChild( new Text( currentString, { font: FONT, fill: PhetColorScheme.RED_COLORBLIND } ) );
    textContainer.addChild( new Text( '=', { font: FONT, fill: 'black', left: textContainer.width + SPACING } ) );
    var currentValue = new Text( '999.9', { font: FONT, fill: 'black', left: textContainer.width + SPACING } );
    textContainer.addChild( currentValue );
    textContainer.addChild( new Text( currentUnitsString, {
      font: FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      left: textContainer.width + SPACING
    } ) );

    // Scale the text if greater than max allowed width.
    if ( textContainer.width > MAX_TEXT_WIDTH ) {
      textContainer.scale( MAX_TEXT_WIDTH / textContainer.width );
    }

    Panel.call( this, textContainer, {
      xMargin: 30,
      yMargin: 15,
      lineWidth: 3,
      resize: false
    } );

    // present for the lifetime of the simulation
    currentProperty.link( function setCurrentText( value ) {
      var rightEdgePos = currentValue.right;
      currentValue.text = Util.toFixed( value, 1 );
      currentValue.right = rightEdgePos;
    } );
  }

  ohmsLaw.register( 'ReadoutPanel', ReadoutPanel );

  return inherit( Panel, ReadoutPanel );
} );