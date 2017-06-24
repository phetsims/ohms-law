// Copyright 2016-2017, University of Colorado Boulder

/**
 * View for a right angled arrow around WireBox
 * The arrow points down and then to the left.
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );
  var Shape = require( 'KITE/Shape' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  // points for the arrow
  var POINTS = [
    new Vector2( 5, -30 ),  // inner tail of arrow
    new Vector2( 13, -30 ), // outer tail of arrow
    new Vector2( 13, 13 ),  // outer corner
    new Vector2( -25, 13 ),
    new Vector2( -25, 17 ),
    new Vector2( -40, 8.5 ), // tip of the arrow head
    new Vector2( -25, 0 ),
    new Vector2( -25, 5 ),
    new Vector2( 5, 5 ) // inner corner
  ];

  /**
   * @param {Property.<number>} currentProperty
   * @param {Object} options
   * @constructor
   */
  function RightAngleArrow( currentProperty, options ) {

    Node.call( this );

    // create the shape of the arrow
    var arrowShape = new Shape().polygon( POINTS );
    var arrowPath = new Path( arrowShape, {
      stroke: '#000',
      fill: PhetColorScheme.RED_COLORBLIND,
      lineWidth: 0.2
    } );
    this.addChild( arrowPath );

    // Present for the lifetime of the simulation
    currentProperty.link( function( current ) {

      // Scale the arrows based on the value of the current.
      // Exponential scaling algorithm.  Linear makes the changes too big.
      var scale = Math.pow( ( current * 0.1 ), 0.7 );
      arrowPath.matrix = Matrix3.scale( scale );
    } );

    this.mutate( options );
  }

  ohmsLaw.register( 'RightAngleArrow', RightAngleArrow );

  return inherit( Node, RightAngleArrow );
} );
