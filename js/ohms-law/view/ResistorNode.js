// Copyright 2017-2018, University of Colorado Boulder

/**
 * View for the resistor with scatterers that depict the level of resistivity
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );

  // a11y strings
  var tinyAmountOfImpuritiesString = OhmsLawA11yStrings.tinyAmountOfImpurities.value;
  var verySmallAmountOfImpuritiesString = OhmsLawA11yStrings.verySmallAmountOfImpurities.value;
  var smallAmountOfImpuritiesString = OhmsLawA11yStrings.smallAmountOfImpurities.value;
  var mediumAmountOfImpuritiesString = OhmsLawA11yStrings.mediumAmountOfImpurities.value;
  var largeAmountOfImpuritiesString = OhmsLawA11yStrings.largeAmountOfImpurities.value;
  var veryLargeAmountOfImpuritiesString = OhmsLawA11yStrings.veryLargeAmountOfImpurities.value;
  var hugeAmountOfImpuritiesString = OhmsLawA11yStrings.hugeAmountOfImpurities.value;
  var resistanceDotsPatternString = OhmsLawA11yStrings.resistanceDotsPattern.value;

  // constants
  var RESISTOR_WIDTH = OhmsLawConstants.WIRE_WIDTH / 2.123; // empirically determined
  var RESISTOR_HEIGHT = OhmsLawConstants.WIRE_HEIGHT / 2.75; // empirically determined
  var PERSPECTIVE_FACTOR = 0.3; // multiplier that controls the width of the ellipses on the ends of the wire
  var MAX_WIDTH_INCLUDING_ROUNDED_ENDS = RESISTOR_WIDTH + RESISTOR_HEIGHT * PERSPECTIVE_FACTOR;

  // dots
  var DOT_RADIUS = 2;
  var AREA_PER_DOT = 40; // adjust this to control the density of the dots
  var NUMBER_OF_DOTS = MAX_WIDTH_INCLUDING_ROUNDED_ENDS * RESISTOR_HEIGHT / AREA_PER_DOT;
  var IMPURITIES_STRINGS = [ tinyAmountOfImpuritiesString, verySmallAmountOfImpuritiesString, smallAmountOfImpuritiesString,
    mediumAmountOfImpuritiesString, largeAmountOfImpuritiesString, veryLargeAmountOfImpuritiesString,
    hugeAmountOfImpuritiesString ];

  var BODY_FILL_GRADIENT = new LinearGradient( 0, -RESISTOR_HEIGHT / 2, 0, RESISTOR_HEIGHT / 2 ) // For 3D effect on the wire.
    .addColorStop( 0, '#F00' )
    .addColorStop( 0.266, '#FFF' )
    .addColorStop( 0.412, '#FCFCFC' )
    .addColorStop( 1, '#F00' );

  var DOT_GRID_ROWS = Util.roundSymmetric( RESISTOR_HEIGHT / Math.sqrt( AREA_PER_DOT ) );
  var DOT_GRID_COLUMNS = Util.roundSymmetric( RESISTOR_WIDTH / Math.sqrt( AREA_PER_DOT ) );
  var MAX_DOTS = DOT_GRID_COLUMNS * DOT_GRID_ROWS;

  // a11y - Function to map resistance to number of dots
  var RESISTANCE_TO_NUM_DOTS = new LinearFunction(
    OhmsLawConstants.RESISTANCE_RANGE.min,
    OhmsLawConstants.RESISTANCE_RANGE.max,
    MAX_DOTS * 0.05,
    MAX_DOTS,
    true
  );

  /**
   * @param {Property.<number>} resistanceProperty
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function ResistorNode( resistanceProperty, tandem, options ) {

    options = _.extend( {

      // a11y
      tagName: 'li' // this assumes that it is a child of a 'ul'
    }, options );

    Node.call( this );
    var self = this;

    // Body of the wire
    var bodyPath = new Path( new Shape().moveTo( -RESISTOR_WIDTH / 2, RESISTOR_HEIGHT / 2 )
      .horizontalLineToRelative( RESISTOR_WIDTH )
      .ellipticalArc( RESISTOR_WIDTH / 2, 0, PERSPECTIVE_FACTOR * RESISTOR_HEIGHT / 2, RESISTOR_HEIGHT / 2, 0, Math.PI / 2, 3 * Math.PI / 2, true )
      .horizontalLineToRelative( -RESISTOR_WIDTH ), {
      stroke: 'black',
      fill: BODY_FILL_GRADIENT,
      tandem: tandem.createTandem( 'bodyPath' )
    } );
    this.addChild( bodyPath );

    // Cap/end of the wire
    var endPath = new Path( Shape.ellipse( -RESISTOR_WIDTH / 2, 0, RESISTOR_HEIGHT * PERSPECTIVE_FACTOR / 2, RESISTOR_HEIGHT / 2 ), {
      stroke: 'black',
      fill: '#ff9f9f',
      tandem: tandem.createTandem( 'endPath' )
    } );
    this.addChild( endPath );

    // Short stub of wire near the cap of wire
    var stubWirePath = new Path( new Shape().moveTo( 5 - RESISTOR_WIDTH / 2, 0 ).horizontalLineToRelative( -15 ), {
      stroke: '#000',
      lineWidth: 10,
      tandem: tandem.createTandem( 'stubWirePath' )
    } );
    this.addChild( stubWirePath );

    // Dots representing charge scatterers.
    var dotsNodeTandem = tandem.createTandem( 'dotsNode' );
    var dotsNode = new Node( { tandem: dotsNodeTandem } );
    var dotsGroupTandem = dotsNodeTandem.createGroupTandem( 'dot' );

    // Create the dots randomly on the resistor. Density is based on AREA_PER_DOT.
    for ( var i = 0; i < NUMBER_OF_DOTS; i++ ) {

      var centerX = ( phet.joist.random.nextDouble() - .5 ) * MAX_WIDTH_INCLUDING_ROUNDED_ENDS;
      var centerY = ( phet.joist.random.nextDouble() - .5 ) * RESISTOR_HEIGHT;
      var dot = new Circle( DOT_RADIUS, {
        fill: 'black',
        centerX: centerX,
        centerY: centerY,
        tandem: dotsGroupTandem.createNextTandem()
      } );
      dotsNode.addChild( dot );
    }
    this.addChild( dotsNode );

    // Clip the dots that are shown to only include those inside the wire (including the wireEnd)
    dotsNode.clipArea = bodyPath.shape.ellipticalArc(
      -RESISTOR_WIDTH / 2,
      0,
      PERSPECTIVE_FACTOR * RESISTOR_HEIGHT / 2,
      RESISTOR_HEIGHT / 2,
      0,
      3 * Math.PI / 2,
      Math.PI / 2,
      true );

    // Set the number of visible dots based on the resistivity. Present for the lifetime of the simulation; no need to unlink.
    resistanceProperty.link( function( resistance ) {
      var numDotsToShow = RESISTANCE_TO_NUM_DOTS( resistance );
      dotsNode.children.forEach( function( dot, index ) {
        dot.setVisible( index < numDotsToShow );
      } );

      self.innerContent = self.getResistanceDescription( resistance );
    } );

    this.mutate( options );
  }

  ohmsLaw.register( 'ResistorNode', ResistorNode );

  return inherit( Node, ResistorNode, {

    /**
     * Get a description of the resistance based on the value of the resistance.
     * @return {string} resistance
     */
    getResistanceDescription: function( resistance ) {
      var range = OhmsLawConstants.RESISTANCE_RANGE;

      // map the normalied value to one of the resistance descriptions
      var index = Util.roundSymmetric( Util.linear( range.min, range.max, 0, IMPURITIES_STRINGS.length - 1, resistance ) );
      var numDotsDescription = IMPURITIES_STRINGS[ index ];

      return StringUtils.fillIn( resistanceDotsPatternString, {
        impurities: numDotsDescription
      } );
    }
  } );
} );