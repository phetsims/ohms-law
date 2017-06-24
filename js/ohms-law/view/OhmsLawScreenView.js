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


  /**
   * @param {OhmsLawModel} model
   * @constructor
   */
  function OhmsLawScreenView( model ) {

    ScreenView.call( this );

    // Circuit node with readout node
    var wireBox = new WireBox( model.voltageProperty, model.resistanceProperty, model.currentProperty ).mutate( { pickable: false } );

    // Node of ohm's law equation. Layout is hardwired, see FormulaNode.
    var formulaNode = new FormulaNode( model.currentProperty, model.voltageProperty, model.resistanceProperty ).mutate( { pickable: false } );

    this.addChild( formulaNode );
    this.addChild( wireBox );

    // Layout of the wirebox
    wireBox.x = 70;
    wireBox.y = 380;

    // Create and add control panel with sliders.
    var controlPanel = new ControlPanel( model.voltageProperty, model.resistanceProperty );
    controlPanel.right = this.layoutBounds.width - 25; // empirically determined
    controlPanel.top = 60; // empirically determined
    this.addChild( controlPanel );
    
    var buttonCenterYOffset = 50; // empirically determined

    // Sound on/off toggle button
    var soundToggleButton = new SoundToggleButton( model.soundActiveProperty, {
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
      listener: function() { model.reset(); }
    } ) );
  }

  ohmsLaw.register( 'OhmsLawScreenView', OhmsLawScreenView );

  return inherit( ScreenView, OhmsLawScreenView );
} );
