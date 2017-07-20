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
  var HBox = require( 'SCENERY/nodes/HBox' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // audio
  // The sounds themselves can be constants because there is only every one instance of OhmsLawScreenView.
  var ADD_BATTERY_SOUND = new Sound( require( 'audio!OHMS_LAW/add-battery' ) );
  var REMOVE_BATTERY_SOUND = new Sound( require( 'audio!OHMS_LAW/remove-battery' ) );

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

    ScreenView.call( this );

    // Node of ohm's law equation. Layout is hardwired, see FormulaNode.
    var formulaNode = new FormulaNode( model, tandem.createTandem( 'formulaNode' ), {
      pickable: false
    } );

    // Circuit node with readout node
    var wireBox = new WireBox( model, tandem.createTandem( 'wireBox' ), {
      pickable: false
    } );

    // Create the control panel with sliders.
    var controlPanel =
      new ControlPanel( model.voltageProperty, model.resistanceProperty, tandem.createTandem( 'controlPanel' ) );

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

    var buttons = new HBox( {
      spacing: 60, // empirically determined
      children: [ resetAllButton, soundToggleButton ]
    } );

    var rightSideLayout = new VBox( {
      spacing: 15,
      children: [ controlPanel, buttons ]
    } );

    // children
    this.addChild( formulaNode );
    this.addChild( wireBox );
    this.addChild( rightSideLayout );

    // layout for the screen
    formulaNode.centerY = this.layoutBounds.bottom / 4.75;

    wireBox.centerX = formulaNode.centerX;
    wireBox.centerY = this.layoutBounds.bottom * .74; // empirically determined

    rightSideLayout.right = this.layoutBounds.width - 50; // empirically determined
    rightSideLayout.centerY = this.layoutBounds.centerY;

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

    this.mutate( {
      tandem: tandem
    } );
  }

  ohmsLaw.register( 'OhmsLawScreenView', OhmsLawScreenView );

  return inherit( ScreenView, OhmsLawScreenView );
} );
