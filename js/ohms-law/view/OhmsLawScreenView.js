// Copyright 2013-2015, University of Colorado Boulder

/**
 * screen view for the Ohm's Law simulation
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var FormulaView = require( 'OHMS_LAW/ohms-law/view/FormulaView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ControlPanel = require( 'OHMS_LAW/ohms-law/view/ControlPanel' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var WireBox = require( 'OHMS_LAW/ohms-law/view/WireBox' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );

  // constants
  var INSET = 25;

  /**
   * @param {OhmsLawModel} model
   * @constructor
   */
  function OhmsLawScreenView( model ) {

    ScreenView.call( this );

    this.addChild( new FormulaView( model ).mutate( { pickable: false } ) );
    this.addChild( new WireBox( model.voltageProperty, model.resistanceProperty, model.currentProperty ).mutate( { pickable: false } ) );

    // create and add control panel with sliders.
    var controlPanel = new ControlPanel( model.voltageProperty, model.resistanceProperty );
    controlPanel.right = this.layoutBounds.width - INSET;
    controlPanel.top = 60; // empirically determined
    this.addChild( controlPanel );

    // reset button
    var buttonCenterYOffset = 50;
    this.addChild( new ResetAllButton( {
      listener: function() { model.reset(); },
      centerX: controlPanel.left + controlPanel.width * 0.27,
      centerY: controlPanel.bottom + buttonCenterYOffset,
      radius: 30
    } ) );

    // sound on/off toggle button
    var soundToggleButton = new SoundToggleButton( model.soundActiveProperty, { scale: 1.15, stroke: 'gray', lineWidth: 0.5 } );
    soundToggleButton.centerX = controlPanel.left + controlPanel.width * 0.70;
    soundToggleButton.centerY = controlPanel.bottom + buttonCenterYOffset;
    this.addChild( soundToggleButton );
  }

  ohmsLaw.register( 'OhmsLawScreenView', OhmsLawScreenView );

  return inherit( ScreenView, OhmsLawScreenView );
} );
