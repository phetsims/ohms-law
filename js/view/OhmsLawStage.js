// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * Stage for the "OhmsLaw" module, sets up the scene.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RootNode = require( 'view/shapes/RootNode' );

  function OhmsLawStage( model ) {
    Node.call( this, {scale: 0.8} );
    this.addChild( new RootNode( model ) );
  }

  inherit( Node, OhmsLawStage );
  return OhmsLawStage;
} );
