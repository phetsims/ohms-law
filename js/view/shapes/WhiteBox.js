/**
 * Copyright 2002-2013, University of Colorado
 * White Block with black border container
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */


define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function WhiteBox( x, y, w, h ) {
    Node.call( this );
    this.addChild( new Rectangle( x, y, w, h, 12, 12, { fill: '#FFF', stroke: "#000", lineWidth: 3} ) );
  }

  inherit( Node, WhiteBox );

  return WhiteBox;
} );