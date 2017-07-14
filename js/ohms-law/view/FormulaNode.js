// Copyright 2016-2017, University of Colorado Boulder

/**
 * view formula ohms law
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
  // Center Y position of all text in the node, empirically determined
  var CENTER_Y = 130;


  /**
   * @param {OhmsLawModel} model
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function FormulaNode( model, tandem, options ) {

    Node.call( this );

    /*
     Hold the metaData for each text to be created
     Scales are used to apply the linear scaling to each letter.
     y = mx + b, scaleM is the coefficient, and B is the y-intercept.
     */
    var textsDataArray = [
      {
        // First so it can be added in back of the formula.
        symbolString: currentSymbolString,
        scaleM: 0.2,
        scaleB: 0.84,
        x: 380,
        property: model.currentProperty,
        color: PhetColorScheme.RED_COLORBLIND,
        maxInitialWidth: 20,
        tandem: tandem.createTandem( 'currentLetter' )
      },
      {
        symbolString: voltageSymbolString,
        scaleM: 2,
        scaleB: 2,
        x: 150,
        property: model.voltageProperty,
        color: OhmsLawConstants.BLUE_COLOR,
        maxInitialWidth: 180,
        tandem: tandem.createTandem( 'voltageLetter' )
      },
      {
        symbolString: resistanceSymbolString,
        scaleM: .015,
        scaleB: 2,
        x: 560,
        property: model.resistanceProperty,
        color: OhmsLawConstants.BLUE_COLOR,
        maxInitialWidth: 175,
        tandem: tandem.createTandem( 'resistanceLetter' )
      }
    ];

    // Create a node to hold all the symbols
    var lettersNode = new Node( { tandem: tandem.createTandem( 'lettersNode' ) } );
    this.addChild( lettersNode );

    // Add the equals sign, which does not change size
    var equalsSign = new Text( '=', { // We never internationalize the '=' sign
      font: new PhetFont( { family: OhmsLawConstants.FONT_FAMILY, size: 140, weight: 'bold' } ),
      fill: '#000',
      centerX: 300,
      centerY: CENTER_Y,
      tandem: tandem.createTandem( 'equalsSign' )
    } );
    this.addChild( equalsSign ); // must come after lettersNode

    // Add the symbol letters to the formula and scale them appropriately
    textsDataArray.forEach( function( textData ) {

      // Centered text node, so we just have to adjust scale dynamically
      var textNode = new Text( textData.symbolString, {
        font: new PhetFont( { family: OhmsLawConstants.FONT_FAMILY, size: 20, weight: 'bold' } ),
        fill: textData.color,
        centerX: 0,
        centerY: 0,
        tandem: textData.tandem
      } );

      // Make sure that the text isn't initially too large and, if so, change the scaling factors.  This is done in
      // support of translation, nin case some symbols are much larger than the V, I, and R symbols used in the English
      // version.
      var initialWidth = textNode.width * textData.scaleM * textData.property.value + textData.scaleB;
      if ( initialWidth > textData.maxInitialWidth ) {
        var scaleFactor = textData.maxInitialWidth / initialWidth;
        textData.scaleM = textData.scaleM * scaleFactor;
        textData.scaleB = textData.scaleB * scaleFactor;
      }

      // Add an invisible rectangle with bounds slightly larger than the text so that artifacts aren't left on the
      // screen, see https://github.com/phetsims/ohms-law/issues/26.
      var antiArtifactRectangle = Rectangle.bounds( textNode.bounds.dilatedX( 1 ) );

      // Create the node that contains the text
      var letterNode = new Node( { children: [ antiArtifactRectangle, textNode ] } );
      lettersNode.addChild( letterNode );

      // Scale the text as the associated value changes. Present for the lifetime of the sim; no need to dispose.
      textData.property.link( function updateProperty( value ) {
        letterNode.setTranslation( textData.x, CENTER_Y );
        letterNode.setScaleMagnitude( textData.scaleM * value + textData.scaleB );
      } );
    } );

    options.tandem = tandem;
    this.mutate( options );
  }

  ohmsLaw.register( 'FormulaNode', FormulaNode );

  return inherit( Node, FormulaNode );
} );
