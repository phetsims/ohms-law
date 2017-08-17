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
  var Property = require( 'AXON/Property' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // strings
  var currentSymbolString = require( 'string!OHMS_LAW/currentSymbol' );
  var resistanceSymbolString = require( 'string!OHMS_LAW/resistanceSymbol' );
  var voltageSymbolString = require( 'string!OHMS_LAW/voltageSymbol' );

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

    var self = this;
    Node.call( this );

    // @private (a11y)
    this.currentRelativeDescription = this.getRelativeSizeDescription( model.getNormalizedCurrent(), 'current' );
    this.voltageRelativeDescription = this.getRelativeSizeDescription( model.getNormalizedVoltage(), 'voltage' );
    this.resistanceRelativeDescription = this.getRelativeSizeDescription( model.getNormalizedResistance(), 'resistance' );

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
    model.currentProperty.link( function() {

      currentLetterNode.setTranslation( currentXPosition, 0 );
      currentLetterNode.setScaleMagnitude( CURRENT_SCALE_M * model.getNormalizedCurrent() + CURRENT_SCALE_B );
      self.currentRelativeDescription = self.getRelativeSizeDescription( model.getNormalizedCurrent(), 'current' );
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
    model.voltageProperty.link( function() {

      voltageLetterNode.setTranslation( voltageXPosition, 0 );
      voltageLetterNode.setScaleMagnitude( OTHERS_SCALE_M * model.getNormalizedVoltage() + OTHERS_SCALE_B );

      self.voltageRelativeDescription = self.getRelativeSizeDescription( model.getNormalizedVoltage(), 'voltage' );
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
    model.resistanceProperty.link( function() {

      resistanceLetterNode.setTranslation( resistanceXPosition, 0 );
      resistanceLetterNode.setScaleMagnitude( OTHERS_SCALE_M * model.getNormalizedResistance() + OTHERS_SCALE_B );

      self.resistanceRelativeDescription = self.getRelativeSizeDescription( model.getNormalizedResistance(), 'resistance' );
    } );

    // Current letter is added first so that when it gets huge, it doesn't cover anything up.
    this.addChild( currentLetterNode );

    this.addChild( resistanceLetterNode );

    this.addChild( voltageLetterNode );

    this.addChild( equalsSign ); // must come after letters to be on top

    Property.multilink( [ model.resistanceProperty, model.currentProperty, model.voltageProperty ],
      function() {

        var vToI = self.getComparisonDescription( self.voltageRelativeDescription, self.currentRelativeDescription );
        var vToR = self.getComparisonDescription( self.voltageRelativeDescription, self.resistanceRelativeDescription );

        console.log( 'V is ' + vToI + ' I and ' + vToR + ' R.' );
      } );

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
     * @param {number} normalizedValue - normalized between 0 and 1, could be any of the letters
     * TODO: remove the property arg, it is just for debugging.
     */
    getRelativeSizeDescription: function( normalizedValue, property ) {

      var index = Math.floor( normalizedValue * OhmsLawConstants.RELATIVE_SIZE_STRINGS.length );

      if ( index === OhmsLawConstants.RELATIVE_SIZE_STRINGS.length ) {
        index = index - 1;
      }

      // This is nice to dubug
      // console.log( property + ': ' + OhmsLawConstants.RELATIVE_SIZE_STRINGS[ index ] );
      return OhmsLawConstants.RELATIVE_SIZE_STRINGS[ index ];
    },

    getComparisonDescription: function( value1, compareTo ) {

      // TODO: this is circular and not very efficient;
      var index1 = OhmsLawConstants.RELATIVE_SIZE_STRINGS.indexOf( value1 );
      var index2 = OhmsLawConstants.RELATIVE_SIZE_STRINGS.indexOf( compareTo );

      var difference = index2 - index1;

      // divide by two because there are only 3 values on either side of 'comparible to', but there are 7 possible descriptions
      difference = Math.floor( difference / 2 );

      // get the middle index of the comparisons
      var middleComparisonIndex = Math.ceil( OhmsLawConstants.COMPARISON_SIZE_STRINGS.length / 2 );

      return OhmsLawConstants.COMPARISON_SIZE_STRINGS[ middleComparisonIndex - difference ];
    }

  } );
} );
