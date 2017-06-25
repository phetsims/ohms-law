// Copyright 2013-2017, University of Colorado Boulder

/**
 * Screen view for the Ohm's Law simulation
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var ControlPanel = require( 'OHMS_LAW/ohms-law/view/ControlPanel' );
  var FormulaNode = require( 'OHMS_LAW/ohms-law/view/FormulaNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var WireBox = require( 'OHMS_LAW/ohms-law/view/WireBox' );
  var Sound = require( 'VIBE/Sound' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );

  // audio
  // The sounds themselves can be constants because there is only every one instance of OhmsLawScreenView.
  var ADD_BATTERY_SOUND = new Sound( require( 'audio!OHMS_LAW/add-battery' ) );
  var REMOVE_BATTERY_SOUND = new Sound( require( 'audio!OHMS_LAW/remove-battery' ) );

  /**
   * @param {OhmsLawModel} model
   * @constructor
   */
  function OhmsLawScreenView( model ) {

    // {Property.<boolean>}
    var soundActiveProperty = new BooleanProperty( true );

    ScreenView.call( this );

    // Node of ohm's law equation. Layout is hardwired, see FormulaNode.
    var formulaNode = new FormulaNode( model.currentProperty, model.voltageProperty, model.resistanceProperty, {
      pickable: false
    } );

    // Add the formula first
    this.addChild( formulaNode );


    // Circuit node with readout node
    var wireBox = new WireBox( model.voltageProperty, model.resistanceProperty, model.currentProperty, {
      pickable: false,
      x: 70, // Layout of the WireBox
      y: 380
    } );
    this.addChild( wireBox );

    // Create and add control panel with sliders.
    var controlPanel = new ControlPanel( model.voltageProperty, model.resistanceProperty );
    controlPanel.right = this.layoutBounds.width - 25; // empirically determined
    controlPanel.top = 60; // empirically determined
    this.addChild( controlPanel );

    var buttonCenterYOffset = 50; // empirically determined

    // Sound on/off toggle button
    var soundToggleButton = new SoundToggleButton( soundActiveProperty, {
      scale: 1.15,
      stroke: 'gray',
      lineWidth: 0.5,
      centerX: controlPanel.left + controlPanel.width * 0.70,  // empirically determined
      centerY: controlPanel.bottom + buttonCenterYOffset
    } );
    this.addChild( soundToggleButton );

    // Reset button
    this.addChild( new ResetAllButton( {
      radius: 30,
      centerX: controlPanel.left + controlPanel.width * 0.27,  // empirically determined
      centerY: controlPanel.bottom + buttonCenterYOffset,
      listener: function() {
        model.reset();
      }
    } ) );

    // Play sounds when adding or removing a battery
    model.voltageProperty.lazyLink( function( voltage, oldVoltage ) {
      var newNumberBatteries = Math.floor( voltage / OhmsLawConstants.AA_VOLTAGE );
      var oldNumberBatteries = Math.floor( oldVoltage / OhmsLawConstants.AA_VOLTAGE );
      if ( soundActiveProperty.value ) {
        if ( newNumberBatteries > oldNumberBatteries ) {
          ADD_BATTERY_SOUND.play();
        }
        else if ( newNumberBatteries < oldNumberBatteries ) {
          REMOVE_BATTERY_SOUND.play();
        }
      }
    } );
  }

  ohmsLaw.register( 'OhmsLawScreenView', OhmsLawScreenView );

  return inherit( ScreenView, OhmsLawScreenView );
} );
