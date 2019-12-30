// Copyright 2017-2019, University of Colorado Boulder

/**
 * Slider unit with a vertical slider, a label above the slider and a readout display below the slider.
 * @author Martin Veillette (Berea College)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Utils = require( 'DOT/Utils' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const Vector2 = require( 'DOT/Vector2' );
  const VSlider = require( 'SUN/VSlider' );

  // constants
  const READOUT_SPACING = 6;

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

    const self = this;

    options = merge( {
      sliderOptions: {
        trackFillEnabled: 'black',
        thumbFill: '#c3c4c5',
        thumbFillHighlighted: '#dedede',
        trackSize: new Dimension2( 4, OhmsLawConstants.SLIDER_HEIGHT ),
        thumbSize: new Dimension2( 45, 22 ),

        // don't allow any values that cannot be displayed by the precision allowed in this sim
        constrainValue: function( value ) {
          return Utils.toFixedNumber( value, options.decimalPlaces );
        },

        // a11y
        keyboardStep: 1,  // delta for keyboard step
        shiftKeyboardStep: 0.1, // delta when holding shift
        roundToStepSize: true, // so default keyboard step rounds to pedagogically useful values
        containerTagName: 'li',
        labelContent: labelContent,
        labelTagName: 'label',
        a11yMapValue: value => Utils.toFixedNumber( value, options.decimalPlaces ),

        // phet-io
        tandem: tandem.createTandem( 'slider' )
      },

      // {number}
      decimalPlaces: 0,

      // phet-io
      tandem: tandem // to be passed to supertype

    }, options );

    // override the start and end drag functions in the options
    const providedStartDragFunction = options.sliderOptions.startDrag;
    options.sliderOptions.startDrag = function( event ) {
      if ( event.type === 'keydown' ) {
        self.sliderDraggingByKeyboardProperty.set( true );
      }
      providedStartDragFunction && providedStartDragFunction();
    };
    const providedEndDragFunction = options.sliderOptions.endDrag;
    options.sliderOptions.endDrag = function() {
      self.sliderDraggingByKeyboardProperty.set( false );
      providedEndDragFunction && providedEndDragFunction();
    };

    Node.call( this );

    // @public (read-only) {BooleanProperty} indicates if the slider is being dragged via the keyboard
    this.sliderDraggingByKeyboardProperty = new BooleanProperty( false );

    const slider = new VSlider( property, range, options.sliderOptions );

    const symbolText = new Text( symbolString, {
      font: OhmsLawConstants.SYMBOL_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      maxWidth: OhmsLawConstants.SLIDER_WIDTH,
      tandem: tandem.createTandem( 'symbolText' )
    } );

    const nameText = new Text( nameString, {
      font: OhmsLawConstants.NAME_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      maxWidth: OhmsLawConstants.SLIDER_WIDTH,
      tandem: tandem.createTandem( 'nameText' )
    } );

    // positioned with `y` rather than using other bounds methods so the text is aligned correctly because text
    // is aligned at y = 0, see https://github.com/phetsims/ohms-law/issues/140
    const headerNode = new Node( {
      children: [ symbolText, nameText ]
    } );
    nameText.center = new Vector2( symbolText.centerX, symbolText.y + 18 );

    const valueText = new Text( Utils.toFixed( range.max, options.decimalPlaces ), {
      font: OhmsLawConstants.READOUT_FONT,
      fill: OhmsLawConstants.BLACK_COLOR,
      tandem: tandem.createTandem( 'valueText' )
    } );

    const unitText = new Text( unitString, {
      font: OhmsLawConstants.UNIT_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      left: valueText.right / 2,

      // Size the unit to be as big as possible next to the value with spacing.
      maxWidth: OhmsLawConstants.UNIT_MAX_WIDTH,
      tandem: tandem.createTandem( 'unitText' )
    } );

    // The readout should be horizontally aligned
    const readout = new Node( {
      children: [ valueText, unitText ]
    } );
    valueText.right = unitText.left - READOUT_SPACING;

    // This ensures that both the value and the unit are on the same line, even if unit has a letter that dips "below" a writing line.
    valueText.y = unitText.y;

    // Background for centering
    const readoutBackground = Rectangle.bounds( readout.bounds, {
      children: [ readout ]
    } );

    // Add components in a vertically spaced stack
    this.addChild( new VBox( {
      spacing: 5,
      children: [ headerNode, slider, readoutBackground ]
    } ) );

    // Update value of the readout. Present for the lifetime of the simulation; no need to unlink.
    property.link( function( value ) {
      valueText.text = Utils.toFixed( value, options.decimalPlaces );
      valueText.right = unitText.left - READOUT_SPACING;
      readout.centerX = readoutBackground.selfBounds.centerX;
    } );

    this.mutate( options );
  }

  ohmsLaw.register( 'SliderUnit', SliderUnit );

  return inherit( Node, SliderUnit );
} );