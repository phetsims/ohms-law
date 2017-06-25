// Copyright 2016-2017, University of Colorado Boulder

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
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function ReadoutPanel( currentProperty, tandem, options ) {

    options = _.extend( {
        xMargin: 30,
        yMargin: 15,
        lineWidth: 3,
        resize: false
      }, options);

    // Not included in the extend call because we don't want the possibility of overwriting the parametric tandem given.
    options.tandem = tandem;


    // Create the text string
    var textContainer = new Node();

    var currentStringText = new Text( currentString, {
      font: FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      tandem: tandem.createTandem( 'currentStringText' )
    } );
    textContainer.addChild( currentStringText );

    var equalsSign = new Text( '=', {
      font: FONT,
      fill: 'black',
      left: textContainer.width + SPACING,
      tandem: tandem.createTandem( 'equalsSign' )
    } );
    textContainer.addChild( equalsSign );

    var currentValue = new Text( '999.9', {
      font: FONT,
      fill: 'black',
      left: textContainer.width + SPACING,
      tandem: tandem.createTandem( 'currentValue' )
    } );
    textContainer.addChild( currentValue );

    var currentUnit = new Text( currentUnitsString, {
      font: FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      left: textContainer.width + SPACING,
      tandem: tandem.createTandem( 'currentUnit' )
    } );
    textContainer.addChild( currentUnit );

    // Scale the text if greater than max allowed width.
    if ( textContainer.width > MAX_TEXT_WIDTH ) {
      textContainer.scale( MAX_TEXT_WIDTH / textContainer.width );
    }


    // Present for the lifetime of the simulation, no need to unlink.
    currentProperty.link( function( current ) {
      var rightEdgePosition = currentValue.right;
      currentValue.text = Util.toFixed( current, 1 );
      currentValue.right = rightEdgePosition;
    } );

    // Create the panel to surround the text node.
    Panel.call( this, textContainer, options );
  }

  ohmsLaw.register( 'ReadoutPanel', ReadoutPanel );

  return inherit( Panel, ReadoutPanel );
} );