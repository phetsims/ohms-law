// Copyright 2013-2022, University of Colorado Boulder

/**
 * View circuit with a resistor, a battery pack, two current arrows and a current readout panel
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import { Node, Rectangle } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawA11yStrings from '../OhmsLawA11yStrings.js';
import OhmsLawConstants from '../OhmsLawConstants.js';
import BatteriesView from './BatteriesView.js';
import ReadoutPanel from './ReadoutPanel.js';
import ResistorNode from './ResistorNode.js';
import RightAngleArrow from './RightAngleArrow.js';

const circuitLabelString = OhmsLawA11yStrings.circuitLabel.value;
const circuitDescriptionString = OhmsLawA11yStrings.circuitDescription.value;
const currentDescriptionPatternString = OhmsLawA11yStrings.currentDescriptionPattern.value;

// constants
const WIDTH = OhmsLawConstants.WIRE_WIDTH;
const HEIGHT = OhmsLawConstants.WIRE_HEIGHT;
const WIRE_THICKNESS = 10;
const OFFSET = 10;  // position offset for the RightAngleArrow

class WireBox extends Node {
  /**
   * @param {OhmsLawModel} model
   * @param {OhmsLawDescriber} ohmsLawDescriber
   * @param {Object} [options]
   */
  constructor( model, ohmsLawDescriber, options ) {

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED,

      // pdom
      tagName: 'ul',
      labelTagName: 'h3',
      labelContent: circuitLabelString,
      descriptionContent: circuitDescriptionString
    }, options );

    super( options );

    // For positioning, the top left corner of the wireFrame is defined as 0,0
    const wireFrame = new Rectangle( 0, 0, WIDTH, HEIGHT, 4, 4, {
      stroke: '#000',
      lineWidth: WIRE_THICKNESS,
      tandem: options.tandem.createTandem( 'wireFrame' )
    } );
    this.addChild( wireFrame );

    const batteriesView = new BatteriesView( model.voltageProperty, {
      left: OhmsLawConstants.BATTERIES_OFFSET, // Slightly to the right of the wire
      centerY: 0,
      tandem: options.tandem.createTandem( 'batteriesView' )
    } );
    this.addChild( batteriesView );

    const resistorNode = new ResistorNode( model.resistanceProperty, {
      centerX: WIDTH / 2,
      centerY: HEIGHT,
      tandem: options.tandem.createTandem( 'resistorNode' )
    } );
    this.addChild( resistorNode );

    // @private
    this.bottomLeftArrow = new RightAngleArrow( model.currentProperty, {
      x: -OFFSET,
      y: HEIGHT + OFFSET,
      rotation: Math.PI / 2,
      tandem: options.tandem.createTandem( 'bottomLeftArrow' )
    } );
    this.addChild( this.bottomLeftArrow );

    const bottomRightArrow = new RightAngleArrow( model.currentProperty, {
      x: WIDTH + OFFSET,
      y: HEIGHT + OFFSET,
      rotation: 0,
      tandem: options.tandem.createTandem( 'bottomRightArrow' )
    } );
    this.addChild( bottomRightArrow );

    // pdom - accessible description for the current
    assert && assert( this.tagName.toUpperCase() === 'UL', 'li children assume list parent' );
    const accessibleCurrentNode = new Node( { tagName: 'li' } );
    this.addChild( accessibleCurrentNode );

    const currentReadoutPanel = new ReadoutPanel( model, {
      centerY: HEIGHT / 2,
      centerX: WIDTH / 2,
      tandem: options.tandem.createTandem( 'currentReadoutPanel' )
    } );
    this.addChild( currentReadoutPanel );

    model.voltageProperty.set( OhmsLawConstants.VOLTAGE_RANGE.min );
    model.resistanceProperty.set( OhmsLawConstants.RESISTANCE_RANGE.max );

    // @private - this is the min height of the arrows for this sim
    this.minArrowHeight = this.bottomLeftArrow.height;

    // reset the model after using to get height of arrows
    model.reset();

    // pdom - when the current changes, update the accessible description
    Multilink.multilink( [ model.currentProperty, model.currentUnitsProperty ], () => {
      accessibleCurrentNode.innerContent = StringUtils.fillIn( currentDescriptionPatternString, {
        arrowSize: this.getArrowSizeDescription(),
        value: model.getFixedCurrent(),
        unit: ohmsLawDescriber.getUnitForCurrent()
      } );
    } );

    // pdom - the order of descriptions should be batteries, resistance, then current
    this.pdomOrder = [ batteriesView, resistorNode, accessibleCurrentNode ];
  }


  /**
   * Get a description of the arrow size.  Returns omething like "small" or "huge" or "medium size".
   * @public
   *
   * @returns {string}
   */
  getArrowSizeDescription() {

    const height = this.bottomLeftArrow.height;

    // Empirically determined, the idea is for the largest relative size string to map to when the 'I' in the formula
    // goes off the screen (or at least close to that), see https://github.com/phetsims/ohms-law/issues/97.
    const maxArrowHeightThresholdCoefficient = 2;

    // The max in the linear function, instead of the max height of the arrow, everything bigger will just be the
    // largest relative size.
    const maxArrowHeightThreshold = HEIGHT * maxArrowHeightThresholdCoefficient;

    // map the normalized height to one of the size descriptions
    let index = Utils.roundSymmetric( Utils.linear(
      this.minArrowHeight, maxArrowHeightThreshold, // a1 b1
      0, OhmsLawConstants.RELATIVE_SIZE_STRINGS.length - 1, // a2 b2
      height ) ); // a3

    // if beyond the threshold, clamp it back to the highest index
    if ( height > maxArrowHeightThreshold ) {
      index = OhmsLawConstants.RELATIVE_SIZE_STRINGS.length - 1;
    }
    assert && assert( index >= 0 && index < OhmsLawConstants.RELATIVE_SIZE_STRINGS.length,
      'mapping to relative size string incorrect' );
    return OhmsLawConstants.RELATIVE_SIZE_STRINGS[ index ].toLowerCase();
  }
}

ohmsLaw.register( 'WireBox', WireBox );

export default WireBox;