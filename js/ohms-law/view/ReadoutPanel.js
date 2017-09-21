// Copyright 2013-2017, University of Colorado Boulder

/**
 * Panel that displays the current inside the WireBox
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var OhmsLawModel = require( 'OHMS_LAW/ohms-law/model/OhmsLawModel' );
  var Panel = require( 'SUN/Panel' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var currentString = require( 'string!OHMS_LAW/current' );
  var currentUnitsString = require( 'string!OHMS_LAW/currentUnits' );

  // constants
  var FONT = new PhetFont( 32 );
  var MAX_READOUT_WIDTH = 0.63 * OhmsLawConstants.WIRE_WIDTH;

  /**
   * @param {OhmsLawModel} model
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function ReadoutPanel( model, tandem, options ) {

    assert && assert( !options.tandem, 'Tandem should be supplied as a parameter' );
    options = _.extend( {
      xMargin: 30,
      yMargin: 8,
      lineWidth: 3,
      resize: false,
      tandem: tandem
    }, options );

    var currentStringText = new Text( currentString, {
      font: FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      tandem: tandem.createTandem( 'currentStringText' )
    } );

    var equalsSign = new Text( '=', {
      font: FONT,
      fill: 'black',
      tandem: tandem.createTandem( 'equalsSign' )
    } );

    var currentValue = new Text( Util.toFixed( OhmsLawModel.getMaxCurrent(), 1 ), {
      font: FONT,
      fill: 'black',
      tandem: tandem.createTandem( 'currentValue' )
    } );

    // To keep the correct spacing as the current value changes
    var currentValueBackground = new Rectangle.bounds( currentValue.bounds, {
      children: [ currentValue ]
    } );

    var currentUnit = new Text( currentUnitsString, {
      font: FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      tandem: tandem.createTandem( 'currentUnit' )
    } );

    var textContainer = new HBox( {
      spacing: 11.3, // empirically determined
      children: [ currentStringText, equalsSign, currentValueBackground, currentUnit ]
    } );

    // Scale the text if greater than max allowed width.
    if ( textContainer.width > MAX_READOUT_WIDTH ) {
      textContainer.scale( MAX_READOUT_WIDTH / textContainer.width );
    }

    // Present for the lifetime of the simulation, no need to unlink.
    model.currentProperty.link( function( current ) {
      var rightEdgePosition = currentValue.right;
      currentValue.text = Util.toFixed( current, 1 );
      currentValue.right = rightEdgePosition;
    } );

    // Create the panel to surround the hBox.
    Panel.call( this, textContainer, options );
  }

  ohmsLaw.register( 'ReadoutPanel', ReadoutPanel );

  return inherit( Panel, ReadoutPanel );
} );