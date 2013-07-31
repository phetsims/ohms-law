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
  var ResetAllButton = require( 'view/ResetAllButton' );
  var ToggleButton = require( 'SUN/ToggleButton' );
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );

  function OhmsLawStage( model ) {
    Node.call( this, {scale: 0.75} );
    this.addChild( new RootNode( model ) );
    //reset button
    this.addChild( new Node( { x: 750, y: 500, children: [ new ResetAllButton( function() {model.reset();} )]} ) );
    //sound on/off toggle
    this.addChild( new Node( { scale: 1.3, x: 880, y: 500, children: [
      new ToggleButton(
        new FontAwesomeNode( 'volume_up', {fill: "#FFF"} ),
        new FontAwesomeNode( 'volume_off', {fill: "#FFF"} ),
        model.soundActiveProperty,
        {addRectangle: true, label: 'Sound', fill: "#F00"} )] } ) );
  }

  inherit( Node, OhmsLawStage );
  return OhmsLawStage;
} );
