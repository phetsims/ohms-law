// Copyright 2017, University of Colorado Boulder

/**
 * Slider unit with a vertical slider, a label above the slider and a readout display below the slider.
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  var READOUT_SPACING = 6;

  /**
   * @param {Property.<number>} property
   * @param {RangeWithValue} range
   * @param {string} symbolString
   * @param {string} nameString
   * @param {string} unitString
   * @param {string} labelContent - a11y, label read by a screen reader on focus
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function SliderUnit( property, range, symbolString, nameString, unitString, labelContent, tandem, options ) {

    options = _.extend( {
      tandem: tandem,
      accessibleDecimalPlaces: 0,
      keyboardStep: 1,
      shiftKeyboardStep: 0.1,
      accessibleValuePattern: '{{value}}', // string pattern used for formating the value read by the screen reader
      endDrag: function() {}, // called at end of drag by HSlider
      startDrag: function() {}
    }, options );

    Node.call( this );

    var slider = new HSlider( property, range, {
      trackFillEnabled: 'black',
      thumbFillEnabled: '#c3c4c5',
      thumbFillHighlighted: '#dedede',
      rotation: -Math.PI / 2,

      trackSize: new Dimension2( OhmsLawConstants.SLIDER_HEIGHT, 4 ),
      tandem: tandem.createTandem( 'slider' ),

      startDrag: options.startDrag,
      endDrag: options.endDrag,

      // a11y
      keyboardStep: options.keyboardStep,
      shiftKeyboardStep: options.shiftKeyboardStep,
      accessibleDecimalPlaces: options.accessibleDecimalPlaces,
      accessibleValuePattern: options.accessibleValuePattern,
      containerTagName: 'li',
      labelContent: labelContent
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
    var readout = new Node( {
      children: [ valueText, unitText ]
    } );
    valueText.right = unitText.left - READOUT_SPACING;

    // This ensures that both the value and the unit are on the same line, even if unit has a letter that dips "below" a writing line.
    valueText.y = unitText.y;

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
      valueText.right = unitText.left - READOUT_SPACING;
      readout.centerX = readoutBackground.selfBounds.centerX;
    } );

    this.mutate( options );
  }

  ohmsLaw.register( 'SliderUnit', SliderUnit );

  return inherit( Node, SliderUnit );
} );