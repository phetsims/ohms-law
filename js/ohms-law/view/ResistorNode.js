// Copyright 2013-2017, University of Colorado Boulder

/**
 * view for the resistor with scatterers that depict the level of resistivity
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
  var WIRE_WIDTH = 260;
  var WIRE_HEIGHT = 66;
  var PERSPECTIVE_FACTOR = 0.3; // multiplier that controls the width of the ellipses on the ends of the wire
  var DOT_RADIUS = 2;
  var DOT_POSITION_RANDOMIZATION_FACTOR = 12; // empirically determined
  var AREA_PER_DOT = 40; // adjust this to control the density of the dots
  var MAX_WIDTH_INCLUDING_ROUNDED_ENDS = WIRE_WIDTH + 2 * WIRE_HEIGHT * PERSPECTIVE_FACTOR;

  /**
   * @param {Property.<number>} resistanceProperty
   * @constructor
   */
  function ResistorNode( resistanceProperty ) {

    Node.call( this );

    // set the gradient on the wire to make it look more 3D
    var bodyFillGradient = new LinearGradient( 0, -WIRE_HEIGHT / 2, 0, WIRE_HEIGHT / 2 )
      .addColorStop( 0, '#F00' )
      .addColorStop( 0.266, '#FFF' )
      .addColorStop( 0.412, '#FCFCFC' )
      .addColorStop( 1, '#F00' );

    // body of the wire
    var bodyPath = new Path( new Shape().moveTo( -WIRE_WIDTH / 2, WIRE_HEIGHT / 2 )
      .horizontalLineToRelative( WIRE_WIDTH )
      .ellipticalArc( WIRE_WIDTH / 2, 0, PERSPECTIVE_FACTOR * WIRE_HEIGHT / 2, WIRE_HEIGHT / 2, 0, Math.PI / 2, 3 * Math.PI / 2, true )
      .horizontalLineToRelative( -WIRE_WIDTH ), {
      stroke: 'black',
      lineWidth: 1,
      fill: bodyFillGradient
    } );

    // cap/end of the wire
    var endPath = new Path( Shape.ellipse( -WIRE_WIDTH / 2, 0, WIRE_HEIGHT * PERSPECTIVE_FACTOR / 2, WIRE_HEIGHT / 2 ), {
      stroke: 'black',
      fill: '#ff9f9f',
      lineWidth: 1
    } );

    // short stub of wire near the cap of wire
    var stubWirePath = new Path( new Shape().moveTo( 5 - WIRE_WIDTH / 2, 0 ).horizontalLineToRelative( -15 ), {
      stroke: '#000',
      lineWidth: 10
    } );

    this.addChild( bodyPath );
    this.addChild( endPath );
    this.addChild( stubWirePath );

    // dots representing charge scatterers.
    var dotGroup = new Node();
    var dotGridColumns = Util.roundSymmetric( WIRE_WIDTH / Math.sqrt( AREA_PER_DOT ) );
    var dotGridRows = Util.roundSymmetric( WIRE_HEIGHT / Math.sqrt( AREA_PER_DOT ) );

    // create the dots by placing them on a grid, but move each one randomly a bit to make them look irregular
    for ( var i = 1; i < dotGridColumns; i++ ) {
      for ( var j = 1; j < dotGridRows; j++ ) {
        var dot = new Circle( DOT_RADIUS, {
          fill: 'black',
          centerX: i * ( MAX_WIDTH_INCLUDING_ROUNDED_ENDS / dotGridColumns ) -
                   MAX_WIDTH_INCLUDING_ROUNDED_ENDS / 2 +
                   (phet.joist.random.nextDouble() - 0.5 ) * DOT_POSITION_RANDOMIZATION_FACTOR,
          centerY: j * ( WIRE_HEIGHT / dotGridRows ) - WIRE_HEIGHT / 2 +
                   ( phet.joist.random.nextDouble() - 0.5 ) * DOT_POSITION_RANDOMIZATION_FACTOR
        } );
        dotGroup.addChild( dot );
      }
    }

    // function to map resistance to number of dots
    var maxDots = dotGridColumns * dotGridRows;
    var resistanceToNumDots = new LinearFunction(
      OhmsLawConstants.RESISTANCE_RANGE.min,
      OhmsLawConstants.RESISTANCE_RANGE.max,
      maxDots * 0.05,
      maxDots,
      true
    );

    // randomize the array of dots so that we can show/hide them in a random way as the resistance changes
    dotGroup.children = phet.joist.random.shuffle( dotGroup.children );

    this.addChild( dotGroup );

    // clip the dots that are shown to only include those inside the wire (including the wireEnd)
    dotGroup.clipArea = bodyPath.shape.ellipticalArc( -WIRE_WIDTH / 2, 0, PERSPECTIVE_FACTOR * WIRE_HEIGHT / 2, WIRE_HEIGHT / 2, 0, 3 * Math.PI / 2, Math.PI / 2, true );

    // set the number of visible dots based on the resistivity
    resistanceProperty.link( function( resistance ) {
      var numDotsToShow = resistanceToNumDots( resistance );
      dotGroup.children.forEach( function( dot, index ) {
        dot.visible = index < numDotsToShow;
      } );
    } );
  }

  ohmsLaw.register( 'ResistorNode', ResistorNode );

  return inherit( Node, ResistorNode );
} );