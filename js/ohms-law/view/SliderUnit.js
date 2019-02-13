// Copyright 2017-2018, University of Colorado Boulder

/**
 * Slider unit with a vertical slider, a label above the slider and a readout display below the slider.
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VSlider = require( 'SUN/VSlider' );

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

    var self = this;

    options = _.extend( {
      sliderOptions: null, // filled in below

      // phet-io
      tandem: tandem, // to be passed to supertype

      // a11y
      accessibleDecimalPlaces: 0
    }, options );

    assert && assert( !options.sliderOptions.tandem, 'tandem is set by SliderUnit.' );
    assert && assert( !options.sliderOptions.labelTagName, 'labelTagName is set by SliderUnit.' );
    assert && assert( !options.sliderOptions.containerTagName, 'containerTagName is set by SliderUnit.' );
    assert && assert( !options.sliderOptions.labelContent, 'labelContent is set by SliderUnit.' );

    // default options to be passed into Slider
    options.sliderOptions = _.extend( {
      trackFillEnabled: 'black',
      thumbFillEnabled: '#c3c4c5',
      thumbFillHighlighted: '#dedede',
      trackSize: new Dimension2( OhmsLawConstants.SLIDER_HEIGHT, 4 ),
      thumbSize: new Dimension2( 22, 45 ),

      // phet-io
      tandem: tandem.createTandem( 'slider' ),

      // a11y
      containerTagName: 'li',
      labelContent: labelContent,
      labelTagName: 'label',
      roundToStepSize: true, // so default keyboard step rounds to pedegogically useful values
      keyboardStep: 1,
      shiftKeyboardStep: 0.1,
      accessibleValuePattern: '{{value}}', // string pattern used for formatting the value read by the screen reader
      accessibleDecimalPlaces: options.accessibleDecimalPlaces // default to the same as the SliderUnit

    }, options.sliderOptions );

    // override the start and end drag functions in the options
    var providedStartDragFunction = options.sliderOptions.startDrag;
    options.sliderOptions.startDrag = function( event ) {
      if ( event.type === 'keydown' ) {
        self.sliderDraggingByKeyboard.set( true );
      }
      providedStartDragFunction && providedStartDragFunction();
    };
    var providedEndDragFunction = options.sliderOptions.endDrag;
    options.sliderOptions.endDrag = function() {
      self.sliderDraggingByKeyboard.set( false );
      providedEndDragFunction && providedEndDragFunction();
    };

    Node.call( this );

    // @public (read-only) {BooleanProperty} - a property that indicates if the slider is being dragged via the keyboard
    this.sliderDraggingByKeyboard = new BooleanProperty( false );

    var slider = new VSlider( property, range, options.sliderOptions );

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