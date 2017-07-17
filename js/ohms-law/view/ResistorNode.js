// Copyright 2013-2017, University of Colorado Boulder

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
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var Util = require( 'DOT/Util' );

  // constants
  var WIRE_WIDTH = OhmsLawConstants.WIRE_WIDTH / 2.123; // empirically determined
  var WIRE_HEIGHT = OhmsLawConstants.WIRE_HEIGHT / 2.75; // empirically determined
  var PERSPECTIVE_FACTOR = 0.3; // multiplier that controls the width of the ellipses on the ends of the wire
  var DOT_RADIUS = 2;
  var DOT_POSITION_RANDOMIZATION_FACTOR = 12; // empirically determined
  var AREA_PER_DOT = 40; // adjust this to control the density of the dots
  var MAX_WIDTH_INCLUDING_ROUNDED_ENDS = WIRE_WIDTH + 2 * WIRE_HEIGHT * PERSPECTIVE_FACTOR;

  var BODY_FILL_GRADIENT = new LinearGradient( 0, -WIRE_HEIGHT / 2, 0, WIRE_HEIGHT / 2 ) // For 3D effect on the wire.
    .addColorStop( 0, '#F00' )
    .addColorStop( 0.266, '#FFF' )
    .addColorStop( 0.412, '#FCFCFC' )
    .addColorStop( 1, '#F00' );

  var DOT_GRID_ROWS = Util.roundSymmetric( WIRE_HEIGHT / Math.sqrt( AREA_PER_DOT ) );
  var DOT_GRID_COLUMNS = Util.roundSymmetric( WIRE_WIDTH / Math.sqrt( AREA_PER_DOT ) );
  var MAX_DOTS = DOT_GRID_COLUMNS * DOT_GRID_ROWS;

  // Function to map resistance to number of dots
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

    Node.call( this );

    // Body of the wire
    var bodyPath = new Path( new Shape().moveTo( -WIRE_WIDTH / 2, WIRE_HEIGHT / 2 )
      .horizontalLineToRelative( WIRE_WIDTH )
      .ellipticalArc( WIRE_WIDTH / 2, 0, PERSPECTIVE_FACTOR * WIRE_HEIGHT / 2, WIRE_HEIGHT / 2, 0, Math.PI / 2, 3 * Math.PI / 2, true )
      .horizontalLineToRelative( -WIRE_WIDTH ), {
      stroke: 'black',
      fill: BODY_FILL_GRADIENT,
      tandem: tandem.createTandem( 'bodyPath' )
    } );
    this.addChild( bodyPath );

    // Cap/end of the wire
    var endPath = new Path( Shape.ellipse( -WIRE_WIDTH / 2, 0, WIRE_HEIGHT * PERSPECTIVE_FACTOR / 2, WIRE_HEIGHT / 2 ), {
      stroke: 'black',
      fill: '#ff9f9f',
      tandem: tandem.createTandem( 'endPath' )
    } );
    this.addChild( endPath );

    // Short stub of wire near the cap of wire
    var stubWirePath = new Path( new Shape().moveTo( 5 - WIRE_WIDTH / 2, 0 ).horizontalLineToRelative( -15 ), {
      stroke: '#000',
      lineWidth: 10,
      tandem: tandem.createTandem( 'stubWirePath' )
    } );
    this.addChild( stubWirePath );


    // Dots representing charge scatterers.
    var dotsNodeTandem = tandem.createTandem( 'dotsNode' );
    var dotsNode = new Node( { tandem: dotsNodeTandem } );
    var dotsGroupTandem = dotsNodeTandem.createGroupTandem( 'dot' );


    // Create the dots by placing them on a grid, but move each one randomly a bit to make them look irregular
    for ( var i = 1; i < DOT_GRID_COLUMNS; i++ ) {
      for ( var j = 1; j < DOT_GRID_ROWS; j++ ) {

        var centerX = i * ( MAX_WIDTH_INCLUDING_ROUNDED_ENDS / DOT_GRID_COLUMNS ) -
                      MAX_WIDTH_INCLUDING_ROUNDED_ENDS / 2 +
                      (phet.joist.random.nextDouble() - 0.5 ) * DOT_POSITION_RANDOMIZATION_FACTOR;
        var centerY = j * ( WIRE_HEIGHT / DOT_GRID_ROWS ) - WIRE_HEIGHT / 2 +
                      ( phet.joist.random.nextDouble() - 0.5 ) * DOT_POSITION_RANDOMIZATION_FACTOR;
        var dot = new Circle( DOT_RADIUS, {
          fill: 'black',
          centerX: centerX,
          centerY: centerY,
          tandem: dotsGroupTandem.createNextTandem()
        } );
        dotsNode.addChild( dot );
      }
    }

    // Randomize the array of dots so that we can show/hide them in a random way as the resistance changes
    dotsNode.children = phet.joist.random.shuffle( dotsNode.children );
    this.addChild( dotsNode );

    // Clip the dots that are shown to only include those inside the wire (including the wireEnd)
    dotsNode.clipArea = bodyPath.shape.ellipticalArc(
      -WIRE_WIDTH / 2,
      0,
      PERSPECTIVE_FACTOR * WIRE_HEIGHT / 2,
      WIRE_HEIGHT / 2,
      0,
      3 * Math.PI / 2,
      Math.PI / 2,
      true );

    // Set the number of visible dots based on the resistivity. Present for the lifetime of the simulation; no need to unlink.
    resistanceProperty.link( function( resistance ) {
      var numDotsToShow = RESISTANCE_TO_NUM_DOTS( resistance );
      dotsNode.children.forEach( function( dot, index ) {
        dot.visible = index < numDotsToShow;
      } );
    } );

    this.mutate( options );
  }

  ohmsLaw.register( 'ResistorNode', ResistorNode );

  return inherit( Node, ResistorNode );
} );