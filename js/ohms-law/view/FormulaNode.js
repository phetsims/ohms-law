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
  var Matrix3 = require( 'DOT/Matrix3' );
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
  var CENTER_Y = 160;


  /**
   * @param {Property.<number>} currentProperty
   * @param {Property.<number>} voltageProperty
   * @param {Property.<number>} resistanceProperty
   * @param {Object} options
   * @constructor
   */
  function FormulaNode( currentProperty, voltageProperty, resistanceProperty, options ) {

    Node.call( this );

    // Hold the metaData for each text to be created
    var textsDataArray = [
      {
        symbolString: currentSymbolString,
        scaleA: 0.2,
        scaleB: 0.84,
        x: 380,
        property: currentProperty,
        color: PhetColorScheme.RED_COLORBLIND,
        maxInitialWidth: 20
      },
      {
        symbolString: voltageSymbolString,
        scaleA: 4.5,
        scaleB: 2,
        x: 150,
        property: voltageProperty,
        color: OhmsLawConstants.BLUE_COLOR,
        maxInitialWidth: 180
      },
      {
        symbolString: resistanceSymbolString,
        scaleA: 0.04,
        scaleB: 2,
        x: 560,
        property: resistanceProperty,
        color: OhmsLawConstants.BLUE_COLOR,
        maxInitialWidth: 175
      }
    ];

    // Create a node to hold all the symbols
    var lettersNode = new Node();
    this.addChild( lettersNode );

    // Add the equals sign, which does not change size
    var equalsSign = new Text( '=', { // We never internationalize the '=' sign
      font: new PhetFont( { family: OhmsLawConstants.FONT_FAMILY, size: 140, weight: 'bold' } ),
      fill: '#000',
      centerX: 300,
      centerY: CENTER_Y
    } );
    this.addChild( equalsSign ); // must come after lettersNode

    // Add the symbol letters to the formula and scale them appropriately
    textsDataArray.forEach( function( textData ) {

      // Centered text node, so we just have to adjust scale dynamically
      var textNode = new Text( textData.symbolString, {
        font: new PhetFont( { family: OhmsLawConstants.FONT_FAMILY, size: 20, weight: 'bold' } ),
        fill: textData.color,
        centerX: 0,
        centerY: 0
      } );

      // Make sure that the text isn't initially too large and, if so, change the scaling factors.  This is done in
      // support of translation, in case some symbols are much larger than the V, I, and R symbols used in the English
      // version.
      var initialWidth = textNode.width * textData.scaleA * textData.property.value + textData.scaleB;
      if ( initialWidth > textData.maxInitialWidth ) {
        var scaleFactor = textData.maxInitialWidth / initialWidth;
        textData.scaleA = textData.scaleA * scaleFactor;
        textData.scaleB = textData.scaleB * scaleFactor;
      }

      // Add an invisible rectangle with bounds slightly larger than the text so that artifacts aren't left on the
      // screen, see https://github.com/phetsims/ohms-law/issues/26.
      var antiArtifactRectangle = Rectangle.bounds( textNode.bounds.dilatedX( 1 ), { fill: 'rgba( 0, 0, 0, 0 )' } );

      // Create the node that contains the text
      var letterNode = new Node( { children: [ antiArtifactRectangle, textNode ] } );
      lettersNode.addChild( letterNode );

      // Scale the text as the associated value changes
      textData.property.link( function updateProperty( value ) {

        // Since it would potentially reduce the area of SVG that gets repainted (may be browser-specific)
        letterNode.matrix = Matrix3.translation( textData.x, CENTER_Y )
          .timesMatrix( Matrix3.scale( textData.scaleA * value + textData.scaleB ) );

        // TODO: Performance: consider not updating the matrix if it hasn't changed (if textData.x, textData.scaleA, and textData.scaleB haven't changed)
      } );
    } );

    this.mutate(options);
  }

  ohmsLaw.register( 'FormulaNode', FormulaNode );

  return inherit( Node, FormulaNode );
} );
