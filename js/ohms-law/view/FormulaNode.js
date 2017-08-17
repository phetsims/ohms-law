// Copyright 2016-2017, University of Colorado Boulder

/**
 * View formula ohms law. This was developed to be statically placed in the view. All components are laid
 * out based on the equals sign.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );

  // strings
  var voltageSymbolString = require( 'string!OHMS_LAW/voltageSymbol' );
  var currentSymbolString = require( 'string!OHMS_LAW/currentSymbol' );
  var resistanceSymbolString = require( 'string!OHMS_LAW/resistanceSymbol' );

  // constants
  var TEXT_FONT = new PhetFont( { family: OhmsLawConstants.FONT_FAMILY, size: 20, weight: 'bold' } );
  var CURRENT_SCALE_M = 150; // empirically determined
  var CURRENT_SCALE_B = 1; // empirically determined
  var OTHERS_SCALE_M = 16; // empirically determined
  var OTHERS_SCALE_B = 4; // empirically determined

  /**
   * @param {OhmsLawModel} model
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function FormulaNode( model, tandem, options ) {

    Node.call( this );

    // Add the equals sign, which does not change size
    var equalsSign = new Text( '=', { // We never internationalize the '=' sign
      font: new PhetFont( { family: OhmsLawConstants.FONT_FAMILY, size: 140, weight: 'bold' } ),
      fill: '#000',
      centerX: 300,
      centerY: 0,
      tandem: tandem.createTandem( 'equalsSign' )
    } );


    // Create the Current Letter
    var currentText = new Text( currentSymbolString, {
      font: TEXT_FONT,
      fill: PhetColorScheme.RED_COLORBLIND,
      centerX: 0,
      centerY: 0,
      tandem: tandem.createTandem( 'currentLetter' )
    } );

    // Create the node that contains the text
    var currentLetterNode = new Node( { children: [ getAntiArtifactRectangle( currentText ), currentText ] } );
    var currentXPosition = equalsSign.centerX + 80;

    // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
    model.currentProperty.link( function updateProperty() {

      currentLetterNode.setTranslation( currentXPosition, 0 );
      currentLetterNode.setScaleMagnitude( CURRENT_SCALE_M * model.getNormalizedCurrent() + CURRENT_SCALE_B );
    } );

    // Create the Voltage Letter
    var voltageText = new Text( voltageSymbolString, {
      font: TEXT_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      centerX: 0,
      centerY: 0,
      tandem: tandem.createTandem( 'voltageLetter' )
    } );

    // Create the node that contains the text
    var voltageLetterNode = new Node( { children: [ getAntiArtifactRectangle( voltageText ), voltageText ] } );
    var voltageXPosition = equalsSign.centerX - 150;

    // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
    model.voltageProperty.link( function updateProperty() {

      voltageLetterNode.setTranslation( voltageXPosition, 0 );
      voltageLetterNode.setScaleMagnitude( OTHERS_SCALE_M * model.getNormalizedVoltage() + OTHERS_SCALE_B );
    } );

    // Create the Resistance Letter
    var resistanceText = new Text( resistanceSymbolString, {
      font: TEXT_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      centerX: 0,
      centerY: 0,
      tandem: tandem.createTandem( 'resistanceLetter' )
    } );

    // Create the node that contains the text
    var resistanceLetterNode = new Node( { children: [ getAntiArtifactRectangle( resistanceText ), resistanceText ] } );
    var resistanceXPosition = equalsSign.centerX + 240;

    // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
    model.resistanceProperty.link( function updateProperty() {

      resistanceLetterNode.setTranslation( resistanceXPosition, 0 );
      resistanceLetterNode.setScaleMagnitude( OTHERS_SCALE_M * model.getNormalizedResistance() + OTHERS_SCALE_B );
    } );

    // Current letter is added first so that when it gets huge, it doesn't cover anything up.
    this.addChild( currentLetterNode );

    this.addChild( resistanceLetterNode );

    this.addChild( voltageLetterNode );

    this.addChild( equalsSign ); // must come after letters to be on top

    options.tandem = tandem;
    this.mutate( options );
  }

  /**
   * Add an invisible rectangle with bounds slightly larger than the text so that artifacts aren't left on the
   * screen, see https://github.com/phetsims/ohms-law/issues/26.
   * @param {Node} node
   * @returns {Rectangle}
   */
  function getAntiArtifactRectangle( node ) {
    return Rectangle.bounds( node.bounds.dilatedX( 1 ) );
  }

  ohmsLaw.register( 'FormulaNode', FormulaNode );

  return inherit( Node, FormulaNode, {

    /**
     * Get a description of the relative sizes of the letters.
     * @return {}
     */
    getRelativeSizeDescription: function( value ) {

    }

  } );
} );
