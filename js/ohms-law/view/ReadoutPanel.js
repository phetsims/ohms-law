// Copyright 2013-2020, University of Colorado Boulder

/**
 * Panel that displays the current inside the WireBox
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const CurrentUnit = require( 'OHMS_LAW/ohms-law/model/CurrentUnit' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  const OhmsLawModel = require( 'OHMS_LAW/ohms-law/model/OhmsLawModel' );
  const Panel = require( 'SUN/Panel' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Utils = require( 'DOT/Utils' );

  // strings
  const currentAmpUnitsString = require( 'string!OHMS_LAW/currentAmpUnits' );
  const currentString = require( 'string!OHMS_LAW/current' );
  const currentUnitsString = require( 'string!OHMS_LAW/currentUnits' );

  // constants
  const FONT = new PhetFont( 32 );
  const MAX_READOUT_WIDTH = 0.63 * OhmsLawConstants.WIRE_WIDTH;

  /**
   * @param {OhmsLawModel} model
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function ReadoutPanel( model, tandem, options ) {

    assert && assert( !options.tandem, 'Tandem should be supplied as a parameter' );
    options = merge( {
      xMargin: 30,
      yMargin: 8,
      lineWidth: 3,
      resize: false,
      tandem: tandem
    }, options );

    const currentStringText = new Text( currentString, {
      font: FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      tandem: tandem.createTandem( 'currentStringText' )
    } );

    const equalsSign = new Text( '=', {
      font: FONT,
      fill: 'black',
      tandem: tandem.createTandem( 'equalsSign' )
    } );

    const currentValue = new Text( Utils.toFixed( OhmsLawModel.getMaxCurrent(), 1 ), {
      font: FONT,
      fill: 'black',
      tandem: tandem.createTandem( 'currentValue' )
    } );

    // To keep the correct spacing as the current value changes
    const currentValueBackground = new Rectangle.bounds( currentValue.bounds, {
      children: [ currentValue ]
    } );

    const currentUnit = new Text( currentUnitsString, {
      font: FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      tandem: tandem.createTandem( 'currentUnit' )
    } );

    const textContainer = new HBox( {
      spacing: 11.3, // empirically determined
      children: [ currentStringText, equalsSign, currentValueBackground, currentUnit ]
    } );

    // Scale the text if greater than max allowed width.
    if ( textContainer.width > MAX_READOUT_WIDTH ) {
      textContainer.scale( MAX_READOUT_WIDTH / textContainer.width );
    }

    // Present for the lifetime of the simulation, no need to unlink.
    Property.multilink( [ model.currentProperty,
      model.currentUnitsProperty ], ( current, units ) => {
      const rightEdgePosition = currentValue.right;
      currentValue.text = model.getFixedCurrent();
      currentValue.right = rightEdgePosition;

      currentUnit.text = units === CurrentUnit.AMPS ? currentAmpUnitsString : currentUnitsString;
    } );

    // Create the panel to surround the hBox.
    Panel.call( this, textContainer, options );
  }

  ohmsLaw.register( 'ReadoutPanel', ReadoutPanel );

  return inherit( Panel, ReadoutPanel );
} );