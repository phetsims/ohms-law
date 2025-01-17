// Copyright 2013-2023, University of Colorado Boulder

/**
 * View formula ohms law. This was developed to be statically placed in the view. All components are laid
 * out based on the equals sign.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import merge from '../../../../phet-core/js/merge.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawMessages from '../../strings/OhmsLawMessages.js';
import PatternMessageProperty from '../../../../chipper/js/browser/PatternMessageProperty.js';
import OhmsLawStrings from '../../OhmsLawStrings.js';
import OhmsLawConstants from '../OhmsLawConstants.js';
import FormulaDescriber from './FormulaDescriber.js';

const currentSymbolString = OhmsLawStrings.currentSymbol;
const resistanceSymbolString = OhmsLawStrings.resistanceSymbol;
const voltageSymbolString = OhmsLawStrings.voltageSymbol;

// constants
const TEXT_FONT = new PhetFont( { family: OhmsLawConstants.FONT_FAMILY, size: 20, weight: 'bold' } );
const CURRENT_SCALE_M = 150; // empirically determined
const CURRENT_SCALE_B = 1; // empirically determined
const OTHERS_SCALE_M = 16; // empirically determined
const OTHERS_SCALE_B = 4; // empirically determined

class FormulaNode extends Node {
  /**
   * @param {OhmsLawModel} model
   * @param {Object} [options]
   */
  constructor( model, options ) {

    options = merge( {
      tandem: Tandem.REQUIRED,

      // pdom
      labelContent: OhmsLawMessages.ohmsLawEquationMessageProperty,
      descriptionContent: OhmsLawMessages.ohmsLawDefinitionMessageProperty,
      tagName: 'div',
      labelTagName: 'h3' // labels should come before other child content
    }, options );

    super();

    // Create the equals sign, which does not change size
    const equalsSignText = new Text( MathSymbols.EQUAL_TO, { // We never internationalize the '=' sign
      font: new PhetFont( { family: OhmsLawConstants.FONT_FAMILY, size: 140, weight: 'bold' } ),
      fill: '#000',
      centerX: 300,
      centerY: 0,
      tandem: options.tandem.createTandem( 'equalsSignText' )
    } );

    // Create the Current Letter
    const currentLetterText = new Text( currentSymbolString, {
      font: TEXT_FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      centerX: 0,
      centerY: 0,
      tandem: options.tandem.createTandem( 'currentLetterText' )
    } );

    // Create the node that contains the text
    this.currentLetterNode = new Node( { children: [ getAntiArtifactRectangle( currentLetterText ), currentLetterText ] } );
    const currentXPosition = equalsSignText.centerX + 80;

    // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
    model.currentProperty.link( () => {
      this.currentLetterNode.setTranslation( currentXPosition, 0 );
      this.currentLetterNode.setScaleMagnitude( CURRENT_SCALE_M * model.getNormalizedCurrent() + CURRENT_SCALE_B );
    } );

    // Create the Voltage Letter
    const voltageLetterText = new Text( voltageSymbolString, {
      font: TEXT_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      centerX: 0,
      centerY: 0,
      tandem: options.tandem.createTandem( 'voltageLetterText' )
    } );

    // Create the node that contains the text
    this.voltageLetterNode = new Node( { children: [ getAntiArtifactRectangle( voltageLetterText ), voltageLetterText ] } );
    const voltageXPosition = equalsSignText.centerX - 150;

    // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
    model.voltageProperty.link( () => {
      this.voltageLetterNode.setTranslation( voltageXPosition, 0 );
      this.voltageLetterNode.setScaleMagnitude( OTHERS_SCALE_M * model.getNormalizedVoltage() + OTHERS_SCALE_B );
    } );

    // Create the Resistance Letter
    const resistanceLetterText = new Text( resistanceSymbolString, {
      font: TEXT_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      centerX: 0,
      centerY: 0,
      tandem: options.tandem.createTandem( 'resistanceLetterText' )
    } );

    // Create the node that contains the text
    this.resistanceLetterNode = new Node( { children: [ getAntiArtifactRectangle( resistanceLetterText ), resistanceLetterText ] } );
    const resistanceXPosition = equalsSignText.centerX + 240;

    // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
    model.resistanceProperty.link( () => {
      this.resistanceLetterNode.setTranslation( resistanceXPosition, 0 );
      this.resistanceLetterNode.setScaleMagnitude( OTHERS_SCALE_M * model.getNormalizedResistance() + OTHERS_SCALE_B );
    } );

    // Current letter is added first so that when it gets huge, it doesn't cover anything up.
    this.addChild( this.currentLetterNode );
    this.addChild( this.resistanceLetterNode );
    this.addChild( this.voltageLetterNode );

    // must come after letters to be on top
    this.addChild( equalsSignText );

    // add a node for accessibility that describes the relative sizes of the letters
    const descriptionNode = new Node( { tagName: 'p' } );
    this.addChild( descriptionNode );

    const formulaDescriber = new FormulaDescriber( model, this.resistanceLetterNode, this.currentLetterNode, this.voltageLetterNode );

    descriptionNode.innerContent = new PatternMessageProperty(
      OhmsLawMessages.relativeSizePatternMessageProperty,
      {
        iComparison: formulaDescriber.vToIComparisonProperty,
        rComparison: formulaDescriber.vToRComparisonProperty
      }
    );

    this.mutate( options );
  }
}

/**
 * Add an invisible rectangle with bounds slightly larger than the text so that artifacts aren't left on the
 * screen, see https://github.com/phetsims/ohms-law/issues/26.
 * @param {Node} node
 * @returns {Rectangle}
 */
function getAntiArtifactRectangle( node ) {
  return Rectangle.bounds( node.bounds.dilated( 1 ), { fill: 'transparent' } );
}

ohmsLaw.register( 'FormulaNode', FormulaNode );

export default FormulaNode;