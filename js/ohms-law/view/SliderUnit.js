// Copyright 2013-2017, University of Colorado Boulder

/**
 * Slider unit with a vertical slider, a label above the slider and a readout display below the slider.
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var Node = require( 'SCENERY/nodes/Node' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );

  // constants
  var READOUT_SPACING = 6;

  /**
   * @param {Property.<number>} property
   * @param {RangeWithValue} range
   * @param {string} symbolString
   * @param {string} nameString
   * @param {string} unitString
   * @param {string} accessibleLabel - label read by a screen reader on focus
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function SliderUnit( property, range, symbolString, nameString, unitString, accessibleLabel, tandem, options ) {

    options = _.extend( {
      accessibleDecimalPlaces: 0,
      keyboardStep: 1,
      shiftKeyboardStep: 0.1,
      accessibleValuePattern: '{{value}}' // string pattern used for formating the value read by the screen reader
    }, options );

    Node.call( this );

    var slider = new HSlider( property, range, {
      trackFillEnabled: 'black',
      thumbFillEnabled: '#c3c4c5',
      thumbFillHighlighted: '#dedede',
      rotation: -Math.PI / 2,

      trackSize: new Dimension2( OhmsLawConstants.SLIDER_HEIGHT, 4 ),
      tandem: tandem.createTandem( 'slider' ),

      // a11y
      keyboardStep: options.keyboardStep,
      shiftKeyboardStep: options.shiftKeyboardStep,
      accessibleDecimalPlaces: options.accessibleDecimalPlaces,
      accessibleValuePattern: options.accessibleValuePattern, 
      labelTagName: 'label',
      parentContainerTagName: 'li',
      accessibleLabel: accessibleLabel,
      prependLabels: true
    } );

    var symbolText = new Text( symbolString, {
      font: OhmsLawConstants.SYMBOL_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      maxWidth: OhmsLawConstants.SLIDER_WIDTH,
      tandem: tandem.createTandem( 'symbolText' )
    } );

    var nameText = new Text( nameString, {
      font: OhmsLawConstants.NAME_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      maxWidth: OhmsLawConstants.SLIDER_WIDTH,
      tandem: tandem.createTandem( 'nameText' )
    } );

    // We want these two close together, like one head unit
    var headerNode = new VBox( {
      spacing: -5, // empirically determined
      children: [ symbolText, nameText ]
    } );

    var valueText = new Text( Util.toFixed( range.max, options.accessibleDecimalPlaces ), {
      font: OhmsLawConstants.READOUT_FONT,
      fill: OhmsLawConstants.BLACK_COLOR,
      tandem: tandem.createTandem( 'valueText' )
    } );

    var unitText = new Text( unitString, {
      font: OhmsLawConstants.UNIT_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      left: valueText.right / 2,

      // Size the unit to be as big as possible next to the value with spacing.
      maxWidth: OhmsLawConstants.SLIDER_WIDTH - valueText.width - READOUT_SPACING,
      tandem: tandem.createTandem( 'unitText' )
    } );

    // The readout should be horizontally aligned
    var readout = new HBox( {
      spacing: READOUT_SPACING,
      children: [ valueText, unitText ]
    } );

    // Background for centering
    var readoutBackground = Rectangle.bounds( readout.bounds, {
      children: [ readout ],
      maxWidth: OhmsLawConstants.SLIDER_WIDTH
    } );

    // Add components in a vertically spaced stack
    this.addChild( new VBox( {
      spacing: 5,
      children: [ headerNode, slider, readoutBackground ]
    } ) );

    // Update value of the readout. Present for the lifetime of the simulation; no need to unlink.
    property.link( function( value ) {
      valueText.text = Util.toFixed( value, options.accessibleDecimalPlaces );
      readout.centerX = readoutBackground.selfBounds.centerX;
    } );

    options.tandem = tandem;
    this.mutate( options );
  }

  ohmsLaw.register( 'SliderUnit', SliderUnit );

  return inherit( Node, SliderUnit );
} );