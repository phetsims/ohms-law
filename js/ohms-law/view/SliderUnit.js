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
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );

  // constants
  var MAX_TEXT_WIDTH = OhmsLawConstants.SLIDERS_HORIZONTAL_SEPARATION * 0.90; // Max text width for labels
  var THUMB_FILL_ENABLED =  '#81aac2'; // dark grey
  var THUMB_FILL_HIGHLIGHTED =   '#a5becd'; // light steel blue

  /**
   * @param {Property.<number>} property
   * @param {RangeWithValue} range
   * @param {string} symbolString
   * @param {string} nameString
   * @param {string} unitString
   * @param {Object} [options]
   * @constructor
   */
  function SliderUnit( property, range, symbolString, nameString, unitString, options ) {

    Node.call( this );

    options = _.extend( {
      numberDecimalPlaces: 1,
      keyboardStep: 1
    }, options );

    // Positions for vertical alignment
    var symbolStringCenterY = OhmsLawConstants.SLIDER_UNIT_VERTICAL_OFFSET;
    var nameTop = symbolStringCenterY + 30;
    var readoutTop = nameTop + OhmsLawConstants.SLIDER_HEIGHT + 60;
    var sliderCenterY = (readoutTop + nameTop) / 2;

    var slider = new HSlider( property, range, {
      trackFillEnabled: 'black',
      thumbFillEnabled: THUMB_FILL_ENABLED,
      thumbFillHighlighted: THUMB_FILL_HIGHLIGHTED,
      rotation: -Math.PI / 2,

      // -10 accounts for a bug fix in HSlider, see https://github.com/phetsims/sun/issues/293
      trackSize: new Dimension2( OhmsLawConstants.SLIDER_HEIGHT - 10, 4 ),
      x: 0,
      centerY: sliderCenterY,
      keyboardStep: options.keyboardStep,
      numberDecimalPlaces: options.numberDecimalPlaces
    } );

    var symbolText = new Text( symbolString, {
      font: OhmsLawConstants.SYMBOL_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      centerX: 0,
      centerY: symbolStringCenterY,
      maxWidth: MAX_TEXT_WIDTH
    } );

    var nameText = new Text( nameString, {
      font: OhmsLawConstants.NAME_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      centerX: 0,
      top: nameTop,
      maxWidth: MAX_TEXT_WIDTH
    } );

    var unitText = new Text( unitString, {
      font: OhmsLawConstants.UNIT_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      left: 20,
      top: readoutTop,
      maxWidth: MAX_TEXT_WIDTH
    } );

    var readout = new Text( Util.toFixed( property.value, options.numberDecimalPlaces ), {
      font: OhmsLawConstants.READOUT_FONT,
      fill: OhmsLawConstants.BLACK_COLOR,
      right: unitText.left - 10,
      top: readoutTop
    } );

    // Children stack from top to bottom in the layout.
    this.addChild( symbolText );
    this.addChild( nameText );
    this.addChild( slider );
    this.addChild( readout );
    this.addChild( unitText );

    // Update value of the readout. Present for the lifetime of the simulation; no need to unlink.
    property.link( function( value ) {
      readout.text = Util.toFixed( value, options.numberDecimalPlaces );
      readout.right = unitText.left - 10;
    } );

    this.mutate( options );
  }

  ohmsLaw.register( 'SliderUnit', SliderUnit );

  return inherit( Node, SliderUnit );
} );