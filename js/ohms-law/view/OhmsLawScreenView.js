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

    // circuit node with readout node
    var wireBox = new WireBox( model.voltageProperty, model.resistanceProperty, model.currentProperty ).mutate( { pickable: false } );

    // node of ohm's law equation
    var formulaNode = new FormulaNode( model.voltageProperty, model.resistanceProperty, model.currentProperty ).mutate( { pickable: false } );

    this.addChild( formulaNode );
    this.addChild( wireBox );

    // layout of the wirebox
    wireBox.x = 70;
    wireBox.y = 380;
    // formulaNode layout is hardwired, see FormulaNode

    // create and add control panel with sliders.
    var controlPanel = new ControlPanel( model.voltageProperty, model.resistanceProperty );
    controlPanel.right = this.layoutBounds.width - 25; // empirically determined
    controlPanel.top = 60;   // empirically determined
    this.addChild( controlPanel );

    // reset button
    var buttonCenterYOffset = 50;     // empirically determined
    this.addChild( new ResetAllButton( {
      listener: function() { model.reset(); },
      centerX: controlPanel.left + controlPanel.width * 0.27,  // empirically determined
      centerY: controlPanel.bottom + buttonCenterYOffset,
      radius: 30
    } ) );

    // sound on/off toggle button
    var soundToggleButton = new SoundToggleButton( model.soundActiveProperty, { scale: 1.15, stroke: 'gray', lineWidth: 0.5 } );
    soundToggleButton.centerX = controlPanel.left + controlPanel.width * 0.70;  // empirically determined
    soundToggleButton.centerY = controlPanel.bottom + buttonCenterYOffset;
    this.addChild( soundToggleButton );
  }

  ohmsLaw.register( 'OhmsLawScreenView', OhmsLawScreenView );

  return inherit( ScreenView, OhmsLawScreenView );
} );
