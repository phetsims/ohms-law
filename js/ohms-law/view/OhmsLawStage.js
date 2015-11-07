// Copyright 2013-2015, University of Colorado Boulder

/**
 * Stage for the "OhmsLaw" module, sets up the scene.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var WireBox = require( 'OHMS_LAW/ohms-law/view/shapes/WireBox' );
  var SlidersBox = require( 'OHMS_LAW/ohms-law/view/shapes/SlidersBox' );
  var FormulaView = require( 'OHMS_LAW/ohms-law/view/shapes/FormulaView' );

  function OhmsLawStage( model ) {
    Node.call( this, { scale: 0.75 } );
    this.addChild( new FormulaView( model ).mutate( { pickable: false } ) );
    this.addChild( new WireBox( model ).mutate( { pickable: false } ) );
    var slidersBox = new SlidersBox( model );
    this.addChild( slidersBox );

    //reset button
    var buttonCenterYOffset = 50;
    this.addChild( new ResetAllButton( {
      listener: function() { model.reset(); },
      centerX: slidersBox.left + slidersBox.width * 0.27,
      centerY: slidersBox.bottom + buttonCenterYOffset,
      radius: 30
    } ) );

    //sound on/off toggle button
    var soundToggleButton = new SoundToggleButton( model.soundActiveProperty, { scale: 1.15, stroke: 'gray', lineWidth: 0.5 } );
    soundToggleButton.centerX = slidersBox.left + slidersBox.width * 0.70;
    soundToggleButton.centerY = slidersBox.bottom + buttonCenterYOffset;
    this.addChild( soundToggleButton );
  }

  inherit( Node, OhmsLawStage );
  return OhmsLawStage;
} );
