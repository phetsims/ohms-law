// Copyright 2013-2019, University of Colorado Boulder

/**
 * View formula ohms law. This was developed to be statically placed in the view. All components are laid
 * out based on the equals sign.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  const OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const currentSymbolString = require( 'string!OHMS_LAW/currentSymbol' );
  const resistanceSymbolString = require( 'string!OHMS_LAW/resistanceSymbol' );
  const voltageSymbolString = require( 'string!OHMS_LAW/voltageSymbol' );

  // a11y strings
  const relativeSizePatternString = OhmsLawA11yStrings.relativeSizePattern.value;
  const ohmsLawEquationString = OhmsLawA11yStrings.ohmsLawEquation.value;
  const ohmsLawDefinitionString = OhmsLawA11yStrings.ohmsLawDefinition.value;

  // constants
  const TEXT_FONT = new PhetFont( { family: OhmsLawConstants.FONT_FAMILY, size: 20, weight: 'bold' } );
  const CURRENT_SCALE_M = 150; // empirically determined
  const CURRENT_SCALE_B = 1; // empirically determined
  const OTHERS_SCALE_M = 16; // empirically determined
  const OTHERS_SCALE_B = 4; // empirically determined

  /**
   * @param {OhmsLawModel} model
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function FormulaNode( model, tandem, options ) {

    options = merge( {

      // a11y
      labelContent: ohmsLawEquationString,
      descriptionContent: ohmsLawDefinitionString,
      tagName: 'div',
      labelTagName: 'h3', // labels should come before other child content
      tandem: tandem
    }, options );

    const self = this;
    Node.call( this );

    // Create the equals sign, which does not change size
    const equalsSign = new Text( MathSymbols.EQUAL_TO, { // We never internationalize the '=' sign
      font: new PhetFont( { family: OhmsLawConstants.FONT_FAMILY, size: 140, weight: 'bold' } ),
      fill: '#000',
      centerX: 300,
      centerY: 0,
      tandem: tandem.createTandem( 'equalsSign' )
    } );

    // Create the Current Letter
    const currentText = new Text( currentSymbolString, {
      font: TEXT_FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      centerX: 0,
      centerY: 0,
      tandem: tandem.createTandem( 'currentLetter' )
    } );

    // Create the node that contains the text
    this.currentLetterNode = new Node( { children: [ getAntiArtifactRectangle( currentText ), currentText ] } );
    const currentXPosition = equalsSign.centerX + 80;

    // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
    model.currentProperty.link( function() {
      self.currentLetterNode.setTranslation( currentXPosition, 0 );
      self.currentLetterNode.setScaleMagnitude( CURRENT_SCALE_M * model.getNormalizedCurrent() + CURRENT_SCALE_B );
    } );

    // Create the Voltage Letter
    const voltageText = new Text( voltageSymbolString, {
      font: TEXT_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      centerX: 0,
      centerY: 0,
      tandem: tandem.createTandem( 'voltageLetter' )
    } );

    // Create the node that contains the text
    this.voltageLetterNode = new Node( { children: [ getAntiArtifactRectangle( voltageText ), voltageText ] } );
    const voltageXPosition = equalsSign.centerX - 150;

    // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
    model.voltageProperty.link( function() {
      self.voltageLetterNode.setTranslation( voltageXPosition, 0 );
      self.voltageLetterNode.setScaleMagnitude( OTHERS_SCALE_M * model.getNormalizedVoltage() + OTHERS_SCALE_B );
    } );

    // Create the Resistance Letter
    const resistanceText = new Text( resistanceSymbolString, {
      font: TEXT_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      centerX: 0,
      centerY: 0,
      tandem: tandem.createTandem( 'resistanceLetter' )
    } );

    // Create the node that contains the text
    this.resistanceLetterNode = new Node( { children: [ getAntiArtifactRectangle( resistanceText ), resistanceText ] } );
    const resistanceXPosition = equalsSign.centerX + 240;

    // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
    model.resistanceProperty.link( function() {
      self.resistanceLetterNode.setTranslation( resistanceXPosition, 0 );
      self.resistanceLetterNode.setScaleMagnitude( OTHERS_SCALE_M * model.getNormalizedResistance() + OTHERS_SCALE_B );
    } );

    // Current letter is added first so that when it gets huge, it doesn't cover anything up.
    this.addChild( self.currentLetterNode );
    this.addChild( self.resistanceLetterNode );
    this.addChild( self.voltageLetterNode );

    // must come after letters to be on top
    this.addChild( equalsSign );

    // add a node for accessibility that describes the relative sizes of the letters
    const descriptionNode = new Node( { tagName: 'p' } );
    this.addChild( descriptionNode );

    // when any of the model Properties change, update the accessible description
    Property.multilink( [ model.currentProperty, model.resistanceProperty, model.voltageProperty ], function( current, resistance, voltage ) {
      descriptionNode.innerContent = self.getComparativeSizeDescription();
    } );

    this.mutate( options );
  }

  /**
   * Add an invisible rectangle with bounds slightly larger than the text so that artifacts aren't left on the
   * screen, see https://github.com/phetsims/ohms-law/issues/26.
   * @param {Node} node
   * @returns {Rectangle}
   */
  function getAntiArtifactRectangle( node ) {
    return Rectangle.bounds( node.bounds.dilated( 1 ) );
  }

  ohmsLaw.register( 'FormulaNode', FormulaNode );

  return inherit( Node, FormulaNode, {

    /**
     * Get the comparative size description for the letters, something like
     * "Letter V is much larger than letter I and comparable to letter R."
     * Used for a11y.
     *
     * @public
     * @returns {string}
     */
    getComparativeSizeDescription: function() {

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
  } );
} );
