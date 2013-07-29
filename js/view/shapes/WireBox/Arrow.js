// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * View for Arrow around WireBox
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  function Arrow( model, x, y, rotation ) {
    Node.call( this, {x: x, y: y, rotation: (rotation / 180 * Math.PI)} );

    var arrow = new Node();
    var arrowShape = new Shape();
    var points = [
      [5, -30],
      [13, -30],
      [13, 13],
      [-25, 13],
      [-25, 17],
      [-40, 8.5],
      [-25, 0],
      [-25, 5],
      [5, 5]
    ];

    arrowShape.moveTo( points[0][0], points[0][1] );
    _.each( points, function( element ) { arrowShape.lineTo( element[0], element[1] ); } );
    arrowShape.close();

    arrow.addChild( new Path( {
      shape: arrowShape,
      stroke: "#000",
      fill: "#F00",
      lineWidth: 0.2
    } ) );
    this.addChild( arrow );
    model.currentProperty.link( function( current ) {
      // Scale the arrows based on the value of the current.
      // Exponential scaling algorithm.  Linear makes the changes too big.
      var scale = Math.pow( ( current * 0.1 ), 0.7 );
      arrow.matrix = new Matrix3();
      arrow.scale( scale );
    } );
  }

  inherit( Node, Arrow );

  return Arrow;
} );