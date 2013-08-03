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
  var ResetAllButton = require( 'view/ResetAllButton' );
  var SoundToggleButton = require( 'SCENERY_PHET/SoundToggleButton' );
  var WireBox = require( 'view/shapes/WireBox' );
  var SlidersBox = require( 'view/shapes/SlidersBox' );
  var FormulaView = require( 'view/shapes/FormulaView' );

  function OhmsLawStage( model ) {
    Node.call( this, {scale: 0.75} );
    this.addChild( new FormulaView( model ).mutate( { pickable: false } ) );
    this.addChild( new WireBox( model ).mutate( { pickable: false } ) );
    this.addChild( new SlidersBox( model ) );
    //reset button
    this.addChild( new Node( { x: 750, y: 500, children: [ new ResetAllButton( function() {model.reset();} )]} ) );
    //sound on/off toggle
    this.addChild( new SoundToggleButton(model.soundActiveProperty, {x: 880, y: 500, scale:1.3}));
  }

  inherit( Node, OhmsLawStage );
  return OhmsLawStage;
} );
