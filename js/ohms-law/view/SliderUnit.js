// Copyright 2017-2023, University of Colorado Boulder

/**
 * Slider unit with a vertical slider, a label above the slider and a readout display below the slider.
 * @author Martin Veillette (Berea College)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import { Node, Rectangle, Text, VBox } from '../../../../scenery/js/imports.js';
import VSlider from '../../../../sun/js/VSlider.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawConstants from '../OhmsLawConstants.js';

// constants
const READOUT_SPACING = 6;

class SliderUnit extends Node {
  /**
   * @param {Property.<number>} property
   * @param {RangeWithValue} range
   * @param {string} symbolString
   * @param {string} nameString
   * @param {TReadOnlyProperty.<string>} unitStringProperty
   * @param {string} labelContent - a11y, label read by a screen reader on focus
   * @param {Object} [options]
   */
  constructor( property, range, symbolString, nameString, unitStringProperty, labelContent, options ) {


    // options used by options below
    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED // to be passed to supertype
    }, options );

    options = merge( {
      sliderOptions: {
        trackFillEnabled: 'black',
        thumbFill: '#c3c4c5',
        thumbFillHighlighted: '#dedede',
        trackSize: new Dimension2( 4, OhmsLawConstants.SLIDER_HEIGHT ),
        thumbSize: new Dimension2( 45, 22 ),

        // Don't allow any values that cannot be displayed by the precision allowed in this sim.
        constrainValue: value => Utils.toFixedNumber( value, options.decimalPlaces ),

        startDrag: _.noop,
        endDrag: _.noop,

        // Turn off default sound generation, since this does its own in a highly customized way.
        soundGenerator: null,

        // pdom
        keyboardStep: 1,  // delta for keyboard step
        shiftKeyboardStep: 0.1, // delta when holding shift
        roundToStepSize: true, // so default keyboard step rounds to pedagogically useful values
        containerTagName: 'div', // this div helps the a11y view look a bit better
        labelContent: labelContent,
        labelTagName: 'label',
        a11yMapPDOMValue: value => Utils.toFixedNumber( value, options.decimalPlaces ),

        // phet-io
        tandem: options.tandem.createTandem( 'slider' )
      },

      // {number}
      decimalPlaces: 0
    }, options );

    // override the start and end drag functions in the options
    const providedStartDragFunction = options.sliderOptions.startDrag;
    options.sliderOptions.startDrag = event => {
      if ( event.type === 'keydown' ) {
        this.sliderDraggingByKeyboardProperty.set( true );
      }
      providedStartDragFunction && providedStartDragFunction();
    };
    const providedEndDragFunction = options.sliderOptions.endDrag;
    options.sliderOptions.endDrag = () => {
      this.sliderDraggingByKeyboardProperty.set( false );
      providedEndDragFunction && providedEndDragFunction();
    };

    super();

    // @public (read-only) {BooleanProperty} indicates if the slider is being dragged via the keyboard
    this.sliderDraggingByKeyboardProperty = new BooleanProperty( false );

    const slider = new VSlider( property, range, options.sliderOptions );

    const symbolText = new Text( symbolString, {
      font: OhmsLawConstants.SYMBOL_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      maxWidth: OhmsLawConstants.SLIDER_WIDTH,
      tandem: options.tandem.createTandem( 'symbolText' )
    } );

    const nameText = new Text( nameString, {
      font: OhmsLawConstants.NAME_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      maxWidth: OhmsLawConstants.SLIDER_WIDTH,
      tandem: options.tandem.createTandem( 'nameText' )
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
      tandem: options.tandem.createTandem( 'valueText' ),
      stringPropertyOptions: { phetioReadOnly: true }
    } );

    const unitText = new Text( unitStringProperty, {
      font: OhmsLawConstants.UNIT_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      left: valueText.right / 2,

      // Size the unit to be as big as possible next to the value with spacing.
      maxWidth: OhmsLawConstants.UNIT_MAX_WIDTH,
      tandem: options.tandem.createTandem( 'unitText' )
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
    property.link( value => {
      valueText.string = Utils.toFixed( value, options.decimalPlaces );
      valueText.right = unitText.left - READOUT_SPACING;
      readout.centerX = readoutBackground.selfBounds.centerX;
    } );

    this.mutate( options );
  }
}

ohmsLaw.register( 'SliderUnit', SliderUnit );

export default SliderUnit;