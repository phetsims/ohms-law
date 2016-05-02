// Copyright 2016, University of Colorado Boulder

/**
 * View for Arrow around WireBox
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

  /**
   * @param {OhmsLawModel} model
   * @param x
   * @param y
   * @param rotation
   * @constructor
   */
  function RightAngleArrow( model, x, y, rotation ) {
    Node.call( this, { x: x, y: y, rotation: (rotation / 180 * Math.PI) } );

    var arrow = new Node();
    var arrowShape = new Shape();
    var points = [
      [ 5, -30 ],
      [ 13, -30 ],
      [ 13, 13 ],
      [ -25, 13 ],
      [ -25, 17 ],
      [ -40, 8.5 ],
      [ -25, 0 ],
      [ -25, 5 ],
      [ 5, 5 ]
    ];

    arrowShape.moveTo( points[ 0 ][ 0 ], points[ 0 ][ 1 ] );
    _.each( points, function( element ) { arrowShape.lineTo( element[ 0 ], element[ 1 ] ); } );
    arrowShape.close();

    arrow.addChild( new Path( arrowShape, {
      stroke: '#000',
      fill: PhetColorScheme.RED_COLORBLIND,
      lineWidth: 0.2
    } ) );
    this.addChild( arrow );
    model.currentProperty.link( function( current ) {
      // Scale the arrows based on the value of the current.
      // Exponential scaling algorithm.  Linear makes the changes too big.
      var scale = Math.pow( ( current * 0.1 ), 0.7 );
      arrow.matrix = Matrix3.scale( scale );
    } );
  }

  ohmsLaw.register( 'RightAngleArrow', RightAngleArrow );

  return inherit( Node, RightAngleArrow );
} );
