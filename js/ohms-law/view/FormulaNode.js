// Copyright 2013-2022, University of Colorado Boulder

/**
 * View formula ohms law. This was developed to be statically placed in the view. All components are laid
 * out based on the equals sign.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import PhetColorScheme from '../../../../scenery-phet/js/PhetColorScheme.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawStrings from '../../OhmsLawStrings.js';
import OhmsLawA11yStrings from '../OhmsLawA11yStrings.js';
import OhmsLawConstants from '../OhmsLawConstants.js';

const currentSymbolString = OhmsLawStrings.currentSymbol;
const resistanceSymbolString = OhmsLawStrings.resistanceSymbol;
const voltageSymbolString = OhmsLawStrings.voltageSymbol;

const relativeSizePatternString = OhmsLawA11yStrings.relativeSizePattern.value;
const ohmsLawEquationString = OhmsLawA11yStrings.ohmsLawEquation.value;
const ohmsLawDefinitionString = OhmsLawA11yStrings.ohmsLawDefinition.value;

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
      labelContent: ohmsLawEquationString,
      descriptionContent: ohmsLawDefinitionString,
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
    const currentText = new Text( currentSymbolString, {
      font: TEXT_FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      centerX: 0,
      centerY: 0,
      tandem: options.tandem.createTandem( 'currentLetterText' )
    } );

    // Create the node that contains the text
    this.currentLetterNode = new Node( { children: [ getAntiArtifactRectangle( currentText ), currentText ] } );
    const currentXPosition = equalsSignText.centerX + 80;

    // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
    model.currentProperty.link( () => {
      this.currentLetterNode.setTranslation( currentXPosition, 0 );
      this.currentLetterNode.setScaleMagnitude( CURRENT_SCALE_M * model.getNormalizedCurrent() + CURRENT_SCALE_B );
    } );

    // Create the Voltage Letter
    const voltageText = new Text( voltageSymbolString, {
      font: TEXT_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      centerX: 0,
      centerY: 0,
      tandem: options.tandem.createTandem( 'voltageLetterText' )
    } );

    // Create the node that contains the text
    this.voltageLetterNode = new Node( { children: [ getAntiArtifactRectangle( voltageText ), voltageText ] } );
    const voltageXPosition = equalsSignText.centerX - 150;

    // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
    model.voltageProperty.link( () => {
      this.voltageLetterNode.setTranslation( voltageXPosition, 0 );
      this.voltageLetterNode.setScaleMagnitude( OTHERS_SCALE_M * model.getNormalizedVoltage() + OTHERS_SCALE_B );
    } );

    // Create the Resistance Letter
    const resistanceText = new Text( resistanceSymbolString, {
      font: TEXT_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      centerX: 0,
      centerY: 0,
      tandem: options.tandem.createTandem( 'resistanceLetterText' )
    } );

    // Create the node that contains the text
    this.resistanceLetterNode = new Node( { children: [ getAntiArtifactRectangle( resistanceText ), resistanceText ] } );
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

    // when any of the model Properties change, update the accessible description
    Multilink.multilink( [ model.currentProperty, model.resistanceProperty, model.voltageProperty ], ( current, resistance, voltage ) => {
      descriptionNode.innerContent = this.getComparativeSizeDescription();
    } );

    this.mutate( options );
  }


  /**
   * Get the comparative size description for the letters, something like
   * "Letter V is much larger than letter I and comparable to letter R."
   * Used for a11y.
   *
   * @public
   * @returns {string}
   */
  getComparativeSizeDescription() {

    const rHeight = this.resistanceLetterNode.height;
    const iHeight = this.currentLetterNode.height;
    const vHeight = this.voltageLetterNode.height;

    const vToI = vHeight / iHeight;
    const vToR = vHeight / rHeight;

    // for iteration
    let i;
    let describedRange;

    // map the relations to the comparative descriptions
    // loop through array of keys to avoid closures every time this is called
    const ranges = OhmsLawConstants.COMPARATIVE_DESCRIPTION_RANGES;
    const keys = Object.keys( ranges );

    // get the relative size description comparing V to I
    let vToIDescription;
    for ( i = 0; i < keys.length; i++ ) {
      describedRange = ranges[ keys[ i ] ];
      if ( describedRange.range.contains( vToI ) ) {
        vToIDescription = describedRange.description;
        break;
      }
    }

    // get the relative size description comparing V to R
    let vToRDescription;
    for ( i = 0; i < keys.length; i++ ) {
      describedRange = ranges[ keys[ i ] ];
      if ( describedRange.range.contains( vToR ) ) {
        vToRDescription = describedRange.description;
        break;
      }
    }

    return StringUtils.fillIn( relativeSizePatternString, {
      iComparison: vToIDescription,
      rComparison: vToRDescription
    } );
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