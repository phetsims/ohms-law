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
  var Range = require( 'DOT/Range' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
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

    // Create the equals sign, which does not change size
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
    this.currentLetterNode = new Node( { children: [ getAntiArtifactRectangle( currentText ), currentText ] } );
    var currentXPosition = equalsSign.centerX + 80;

    // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
    model.currentProperty.link( function() {
      self.currentLetterNode.setTranslation( currentXPosition, 0 );
      self.currentLetterNode.setScaleMagnitude( CURRENT_SCALE_M * model.getNormalizedCurrent() + CURRENT_SCALE_B );
    } );

    // get the maximum hight for I in this sim
    model.voltageProperty.set( OhmsLawConstants.VOLTAGE_RANGE.max );
    model.resistanceProperty.set( OhmsLawConstants.RESISTANCE_RANGE.min );
    var iHeightMax = self.currentLetterNode.height;

    // get thhe minimum height for I in this sim
    model.voltageProperty.set( OhmsLawConstants.VOLTAGE_RANGE.min );
    model.resistanceProperty.set( OhmsLawConstants.VOLTAGE_RANGE.max );
    var iHeightMin = self.currentLetterNode.height;

    // this is the range of heights for this sim (thought we would likely want to do a comprehensive
    // check against extrema for all leters for maintainability)
    this.letterHeightRange = new Range( iHeightMin, iHeightMax );

    // reset the model after using to get heights of letters
    model.reset();

    // Create the Voltage Letter
    var voltageText = new Text( voltageSymbolString, {
      font: TEXT_FONT,
      fill: OhmsLawConstants.BLUE_COLOR,
      centerX: 0,
      centerY: 0,
      tandem: tandem.createTandem( 'voltageLetter' )
    } );

    // Create the node that contains the text
    this.voltageLetterNode = new Node( { children: [ getAntiArtifactRectangle( voltageText ), voltageText ] } );
    var voltageXPosition = equalsSign.centerX - 150;

    // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
    model.voltageProperty.link( function() {
      self.voltageLetterNode.setTranslation( voltageXPosition, 0 );
      self.voltageLetterNode.setScaleMagnitude( OTHERS_SCALE_M * model.getNormalizedVoltage() + OTHERS_SCALE_B );
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
    this.resistanceLetterNode = new Node( { children: [ getAntiArtifactRectangle( resistanceText ), resistanceText ] } );
    var resistanceXPosition = equalsSign.centerX + 240;

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

    Property.multilink( [ model.currentProperty, model.resistanceProperty, model.voltageProperty ], function( current, resistance, voltage ) {
      self.getComparativeSizeDescription();
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
     * Get the comparative size description for the letters, something like
     * "Letter V is much larger than letter I and comparable to letter R."
     * 
     * @public
     * @return {string} 
     */
    getComparativeSizeDescription: function() {

      var rHeight = this.resistanceLetterNode.height;
      var iHeight = this.currentLetterNode.height;
      var vHeight = this.voltageLetterNode.height;

      var vToI = vHeight / iHeight;
      var vToR = vHeight / rHeight;

      // for iteration
      var i;
      var describedRange;

      // map the relations to the comparative descriptions
      // loop through array of keys to avoid closures every time this is called
      var ranges = OhmsLawConstants.COMPARATIVE_DESCRIPTION_RANGES;
      var keys = Object.keys( ranges );

      // get the relative size description comparing V to I
      var vToIDescription;
      for ( i = 0; i < keys.length; i++ ) {
        describedRange = ranges[ keys[ i ] ];
        if ( describedRange.range.contains( vToI ) ) {
          vToIDescription = describedRange.description;
          break;
        } 
      }

      // get the relative size description comparing V to R
      var vToRDescription;
      for ( i = 0; i < keys.length; i++ ) {
        describedRange = ranges[ keys[ i ] ];
        if ( describedRange.range.contains( vToR ) ) {
          vToRDescription = describedRange.description;
          break;
        } 
      }

      var patternString = 'Letter V is {{iComparison}} than letter I and {{rComparison}} than letter R.';
      var description = StringUtils.fillIn( patternString, {
        iComparison: vToIDescription,
        rComparison: vToRDescription
      } );
      console.log( description );

      return description;
    }
  } );
} );
