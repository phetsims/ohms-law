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
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var ControlPanel = require( 'OHMS_LAW/ohms-law/view/ControlPanel' );
  var ControlAreaNode = require( 'SCENERY_PHET/accessibility/nodes/ControlAreaNode' );
  var FormulaNode = require( 'OHMS_LAW/ohms-law/view/FormulaNode' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var OhmsLawScreenSummaryNode = require( 'OHMS_LAW/ohms-law/view/OhmsLawScreenSummaryNode' );
  var PlayAreaNode = require( 'SCENERY_PHET/accessibility/nodes/PlayAreaNode' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Sound = require( 'VIBE/Sound' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var WireBox = require( 'OHMS_LAW/ohms-law/view/WireBox' );

  // audio
  // The sounds themselves can be constants because there is only every one instance of OhmsLawScreenView.
  var ADD_BATTERY_SOUND = new Sound( require( 'sound!OHMS_LAW/add-battery.mp3' ) );
  var REMOVE_BATTERY_SOUND = new Sound( require( 'sound!OHMS_LAW/remove-battery.mp3' ) );

  /**
   * @param {OhmsLawModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function OhmsLawScreenView( model, tandem ) {

    // {Property.<boolean>}
    var soundActiveProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'soundActiveProperty' )
    } );

    ScreenView.call( this, {
      tandem: tandem,

      // a11y - temporary, should be removed on completion of https://github.com/phetsims/scenery-phet/issues/393
      addScreenSummaryNode: true
    } );

    // Node of ohm's law equation. Layout is hardwired, see FormulaNode.
    var formulaNode = new FormulaNode( model, tandem.createTandem( 'formulaNode' ), {
      pickable: false
    } );

    // Circuit node with readout node
    var wireBox = new WireBox( model, tandem.createTandem( 'wireBox' ), {
      pickable: false
    } );

    // a11y - the screen summary to be read by assistive technology
    // this.addChild( new OhmsLawScreenSummaryNode( model ) );
    this.screenSummaryNode.addChild( new OhmsLawScreenSummaryNode( model ) );

    // Create the control panel with sliders.
    var controlPanel = new ControlPanel( model.voltageProperty, model.resistanceProperty, model.currentProperty, tandem.createTandem( 'controlPanel' ) );

    // Sound on/off toggle button
    var soundToggleButton = new SoundToggleButton( soundActiveProperty, {
      stroke: 'gray',
      lineWidth: 0.5,
      tandem: tandem.createTandem( 'soundToggleButton' )
    } );

    var resetAllButton = new ResetAllButton( {
      radius: 28,
      listener: function() {
        model.reset();
        soundActiveProperty.reset();
      },
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    // a11y - formula and circuit are contained in a "Play Area", structure available to assistive technology
    var playAreaNode = new PlayAreaNode();
    this.addChild( playAreaNode );

    // a11y - sound and reset all buttons contained in a "Control Panel", structure available to assistive technology
    var controlPanelSectionNode = new ControlAreaNode();
    this.addChild( controlPanelSectionNode );

    var buttons = new HBox( {
      spacing: 60, // empirically determined
      children: [ soundToggleButton, resetAllButton ]
    } );

    // children
    playAreaNode.addChild( formulaNode );
    playAreaNode.addChild( wireBox );
    playAreaNode.addChild( controlPanel );
    controlPanelSectionNode.addChild( buttons );

    // layout for the screen
    formulaNode.centerY = this.layoutBounds.bottom / 4.75;

    wireBox.centerX = formulaNode.centerX;
    wireBox.centerY = this.layoutBounds.bottom * .74; // empirically determined

    controlPanel.right = this.layoutBounds.width - 50; // empirically determined
    controlPanel.centerY = this.layoutBounds.centerY - buttons.height / 2;
    buttons.centerTop = controlPanel.centerBottom.plusXY( 0, 15 );

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
