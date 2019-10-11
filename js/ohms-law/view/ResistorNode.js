// Copyright 2017-2019, University of Colorado Boulder

/**
 * View for the resistor with scatterers that depict the level of resistivity
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const LinearGradient = require( 'SCENERY/util/LinearGradient' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  const OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Shape = require( 'KITE/Shape' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );

  // a11y strings
  const tinyAmountOfImpuritiesString = OhmsLawA11yStrings.tinyAmountOfImpurities.value;
  const verySmallAmountOfImpuritiesString = OhmsLawA11yStrings.verySmallAmountOfImpurities.value;
  const smallAmountOfImpuritiesString = OhmsLawA11yStrings.smallAmountOfImpurities.value;
  const mediumAmountOfImpuritiesString = OhmsLawA11yStrings.mediumAmountOfImpurities.value;
  const largeAmountOfImpuritiesString = OhmsLawA11yStrings.largeAmountOfImpurities.value;
  const veryLargeAmountOfImpuritiesString = OhmsLawA11yStrings.veryLargeAmountOfImpurities.value;
  const hugeAmountOfImpuritiesString = OhmsLawA11yStrings.hugeAmountOfImpurities.value;
  const resistanceDotsPatternString = OhmsLawA11yStrings.resistanceDotsPattern.value;

  // constants
  const RESISTOR_WIDTH = OhmsLawConstants.WIRE_WIDTH / 2.123; // empirically determined
  const RESISTOR_HEIGHT = OhmsLawConstants.WIRE_HEIGHT / 2.75; // empirically determined
  const PERSPECTIVE_FACTOR = 0.3; // multiplier that controls the width of the ellipses on the ends of the wire
  const MAX_WIDTH_INCLUDING_ROUNDED_ENDS = RESISTOR_WIDTH + RESISTOR_HEIGHT * PERSPECTIVE_FACTOR;

  // dots
  const DOT_RADIUS = 2;
  const AREA_PER_DOT = 40; // adjust this to control the density of the dots
  const NUMBER_OF_DOTS = MAX_WIDTH_INCLUDING_ROUNDED_ENDS * RESISTOR_HEIGHT / AREA_PER_DOT;
  const IMPURITIES_STRINGS = [ tinyAmountOfImpuritiesString, verySmallAmountOfImpuritiesString, smallAmountOfImpuritiesString,
    mediumAmountOfImpuritiesString, largeAmountOfImpuritiesString, veryLargeAmountOfImpuritiesString,
    hugeAmountOfImpuritiesString ];

  const BODY_FILL_GRADIENT = new LinearGradient( 0, -RESISTOR_HEIGHT / 2, 0, RESISTOR_HEIGHT / 2 ) // For 3D effect on the wire.
    .addColorStop( 0, '#F00' )
    .addColorStop( 0.266, '#FFF' )
    .addColorStop( 0.412, '#FCFCFC' )
    .addColorStop( 1, '#F00' );

  const DOT_GRID_ROWS = Util.roundSymmetric( RESISTOR_HEIGHT / Math.sqrt( AREA_PER_DOT ) );
  const DOT_GRID_COLUMNS = Util.roundSymmetric( RESISTOR_WIDTH / Math.sqrt( AREA_PER_DOT ) );
  const MAX_DOTS = DOT_GRID_COLUMNS * DOT_GRID_ROWS;

  // a11y - Function to map resistance to number of dots
  const RESISTANCE_TO_NUM_DOTS = new LinearFunction(
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

    options = merge( {

      // a11y
      tagName: 'li' // this assumes that it is a child of a 'ul'
    }, options );

    Node.call( this );
    const self = this;

    // Body of the wire
    const bodyPath = new Path( new Shape().moveTo( -RESISTOR_WIDTH / 2, RESISTOR_HEIGHT / 2 )
      .horizontalLineToRelative( RESISTOR_WIDTH )
      .ellipticalArc( RESISTOR_WIDTH / 2, 0, PERSPECTIVE_FACTOR * RESISTOR_HEIGHT / 2, RESISTOR_HEIGHT / 2, 0, Math.PI / 2, 3 * Math.PI / 2, true )
      .horizontalLineToRelative( -RESISTOR_WIDTH ), {
      stroke: 'black',
      fill: BODY_FILL_GRADIENT,
      tandem: tandem.createTandem( 'bodyPath' )
    } );
    this.addChild( bodyPath );

    // Cap/end of the wire
    const endPath = new Path( Shape.ellipse( -RESISTOR_WIDTH / 2, 0, RESISTOR_HEIGHT * PERSPECTIVE_FACTOR / 2, RESISTOR_HEIGHT / 2 ), {
      stroke: 'black',
      fill: '#ff9f9f',
      tandem: tandem.createTandem( 'endPath' )
    } );
    this.addChild( endPath );

    // Short stub of wire near the cap of wire
    const stubWirePath = new Path( new Shape().moveTo( 5 - RESISTOR_WIDTH / 2, 0 ).horizontalLineToRelative( -15 ), {
      stroke: '#000',
      lineWidth: 10,
      tandem: tandem.createTandem( 'stubWirePath' )
    } );
    this.addChild( stubWirePath );

    // Dots representing charge scatterers.
    const dotsNodeTandem = tandem.createTandem( 'dotsNode' );
    const dotsNode = new Node( { tandem: dotsNodeTandem } );
    const dotsGroupTandem = dotsNodeTandem.createGroupTandem( 'dot' );

    // Create the dots randomly on the resistor. Density is based on AREA_PER_DOT.
    for ( let i = 0; i < NUMBER_OF_DOTS; i++ ) {

      const centerY = ( phet.joist.random.nextDouble() - .5 ) * ( RESISTOR_HEIGHT - DOT_RADIUS * 2 );

      // for the given y coordinate, calculate the x coordinate that will put the dot completely within the
      // wire (including rounded wire ends) using the formula for an ellipse: (x^2 / a^2) + (y^2 / b^2) = 1
      // NOTE: this sim used to use a clipArea for this but that is too slow on iPad Air 2,
      // see https://github.com/phetsims/ohms-law/issues/132
      const a = PERSPECTIVE_FACTOR * RESISTOR_HEIGHT / 2; // elliptical x radius
      const b = RESISTOR_HEIGHT / 2; // elliptical y radius
      const ellipticalX = Math.sqrt( ( 1 - ( centerY * centerY ) / ( b * b ) ) * ( a * a ) );

      const maxWidthIncludingEndLimit = RESISTOR_WIDTH + ellipticalX;
      const centerX = ( phet.joist.random.nextDouble() - .5 ) * maxWidthIncludingEndLimit;

      const dot = new Circle( DOT_RADIUS, {
        fill: 'black',
        centerX: centerX,
        centerY: centerY,
        tandem: dotsGroupTandem.createNextTandem()
      } );
      dotsNode.addChild( dot );
    }
    this.addChild( dotsNode );

    // Set the number of visible dots based on the resistivity. Present for the lifetime of the simulation; no need to unlink.
    resistanceProperty.link( function( resistance ) {
      const numDotsToShow = RESISTANCE_TO_NUM_DOTS( resistance );
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
     * @returns {string} resistance
     */
    getResistanceDescription: function( resistance ) {
      const range = OhmsLawConstants.RESISTANCE_RANGE;

      // map the normalied value to one of the resistance descriptions
      const index = Util.roundSymmetric( Util.linear( range.min, range.max, 0, IMPURITIES_STRINGS.length - 1, resistance ) );
      const numDotsDescription = IMPURITIES_STRINGS[ index ];

      return StringUtils.fillIn( resistanceDotsPatternString, {
        impurities: numDotsDescription
      } );
    }
  } );
} );