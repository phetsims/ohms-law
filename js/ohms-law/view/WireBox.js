// Copyright 2013-2025, University of Colorado Boulder

/**
 * View circuit with a resistor, a battery pack, two current arrows and a current readout panel
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Node, Rectangle } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import OhmsLawMessages from '../../strings/OhmsLawMessages.js';
import ohmsLaw from '../../ohmsLaw.js';
import PatternMessageProperty from '../../../../chipper/js/browser/PatternMessageProperty.js';
import OhmsLawConstants from '../OhmsLawConstants.js';
import BatteriesView from './BatteriesView.js';
import ReadoutPanel from './ReadoutPanel.js';
import ResistorNode from './ResistorNode.js';
import RightAngleArrow from './RightAngleArrow.js';
import WireBoxDescriber from './WireBoxDescriber.js';

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
      labelContent: OhmsLawMessages.circuitLabelMessageProperty,
      descriptionContent: OhmsLawMessages.circuitDescriptionMessageProperty
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

    const resistorNode = new ResistorNode( model.resistanceProperty, ohmsLawDescriber.resistorImpuritiesProperty, {
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

    const wireBoxDescriber = new WireBoxDescriber( model, this.bottomLeftArrow );

    accessibleCurrentNode.innerContent = new PatternMessageProperty(
      OhmsLawMessages.currentDescriptionPatternMessageProperty,
      {
        arrowSize: wireBoxDescriber.arrowSizeDescriptionProperty,
        value: ohmsLawDescriber.formattedCurrentProperty,
        unit: model.currentUnitsProperty
      }
    );

    // pdom - the order of descriptions should be batteries, resistance, then current
    this.pdomOrder = [ batteriesView, resistorNode, accessibleCurrentNode ];
  }
}

ohmsLaw.register( 'WireBox', WireBox );

export default WireBox;