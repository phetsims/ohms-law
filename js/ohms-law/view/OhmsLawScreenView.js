// Copyright 2013-2015, University of Colorado Boulder

/**
 * Stage for the "OhmsLaw" module, sets up the scene.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var FormulaView = require( 'OHMS_LAW/ohms-law/view/FormulaView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SlidersBox = require( 'OHMS_LAW/ohms-law/view/SlidersBox' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var WireBox = require( 'OHMS_LAW/ohms-law/view/WireBox' );

  // constants
  var INSET = 25;

  /**
   * @param {OhmsLawModel} model
   * @constructor
   */
  function OhmsLawStage( model ) {

    ScreenView.call( this );

    this.addChild( new FormulaView( model ).mutate( { pickable: false } ) );
    this.addChild( new WireBox( model ).mutate( { pickable: false } ) );
    var slidersBox = new SlidersBox( model, {
      right: this.layoutBounds.width - INSET,
      top: 60 // empirically determined
    } );
    this.addChild( slidersBox );

    // reset button
    var buttonCenterYOffset = 50;
    this.addChild( new ResetAllButton( {
      listener: function() { model.reset(); },
      centerX: slidersBox.left + slidersBox.width * 0.27,
      centerY: slidersBox.bottom + buttonCenterYOffset,
      radius: 30
    } ) );

    // sound on/off toggle button
    var soundToggleButton = new SoundToggleButton( model.soundActiveProperty, { scale: 1.15, stroke: 'gray', lineWidth: 0.5 } );
    soundToggleButton.centerX = slidersBox.left + slidersBox.width * 0.70;
    soundToggleButton.centerY = slidersBox.bottom + buttonCenterYOffset;
    this.addChild( soundToggleButton );
  }

  return inherit( ScreenView, OhmsLawStage );
} );
