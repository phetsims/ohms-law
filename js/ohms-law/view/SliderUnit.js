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
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );

  // images
  var thumbImage = require( 'image!OHMS_LAW/thumb.png' );

  // constants
  var MAX_TEXT_WIDTH = OhmsLawConstants.SLIDERS_HORIZONTAL_SEPARATION * 0.90; // max text width for labels

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

    // positions for vertical alignment
    var symbolStringCenterY = OhmsLawConstants.SLIDER_UNIT_VERTICAL_OFFSET;
    var nameTop = symbolStringCenterY + 30;
    var readoutTop = nameTop + OhmsLawConstants.SLIDER_HEIGHT + 40;
    var sliderCenterY = (readoutTop + nameTop) / 2;

    // thumb for the slider
    var thumb = new Image( thumbImage, { rotation: Math.PI / 2 } );
    thumb.scale( OhmsLawConstants.THUMB_HEIGHT / thumb.height );
    thumb.touchArea = thumb.localBounds.dilated( 30 );

    var slider = new HSlider( property, range, {
      trackFillEnabled: 'black',
      rotation: -Math.PI / 2,
      trackSize: new Dimension2( OhmsLawConstants.SLIDER_HEIGHT - 2 * thumb.height, 4 ),
      thumbNode: thumb,
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

    this.addChild( symbolText );
    this.addChild( nameText );
    this.addChild( slider );
    this.addChild( readout );
    this.addChild( unitText );

    // no need to unlink, present for the lifetime of the simulation
    // update value of the readout
    property.link( function( value ) {
      readout.text = Util.toFixed( value, options.numberDecimalPlaces );
      readout.right = unitText.left - 10;
    } );

  }

  ohmsLaw.register( 'SliderUnit', SliderUnit );

  return inherit( Node, SliderUnit );
} );