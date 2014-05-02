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
  var ResetAllButtonDeprecated = require( 'SCENERY_PHET/ResetAllButtonDeprecated' );
  var SoundToggleButtonDeprecated = require( 'SCENERY_PHET/SoundToggleButtonDeprecated' );
  var WireBox = require( 'view/shapes/WireBox' );
  var SlidersBox = require( 'view/shapes/SlidersBox' );
  var FormulaView = require( 'view/shapes/FormulaView' );

  function OhmsLawStage( model ) {
    Node.call( this, {scale: 0.75} );
    this.addChild( new FormulaView( model ).mutate( { pickable: false } ) );
    this.addChild( new WireBox( model ).mutate( { pickable: false } ) );
    var slidersBox = new SlidersBox( model );
    this.addChild( slidersBox );

    //reset button
    var buttonCenterYOffset = 50;
    this.addChild( new ResetAllButtonDeprecated(
        function() {model.reset();},
        { centerX: slidersBox.left + slidersBox.width * 0.27, centerY: slidersBox.bottom + buttonCenterYOffset } )
    );

    //sound on/off toggle button
    var soundToggleButton = new SoundToggleButtonDeprecated( model.soundActiveProperty, { scale: 1.3 } );
    soundToggleButton.centerX = slidersBox.left + slidersBox.width * 0.70;
    soundToggleButton.centerY = slidersBox.bottom + buttonCenterYOffset;
    this.addChild( soundToggleButton );
  }

  inherit( Node, OhmsLawStage );
  return OhmsLawStage;
} );
