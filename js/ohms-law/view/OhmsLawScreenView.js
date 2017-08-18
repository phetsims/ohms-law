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
  var Util = require( 'DOT/Util' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var UtteranceQueue = require( 'SCENERY_PHET/accessibility/UtteranceQueue' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var JoistA11yStrings = require( 'JOIST/JoistA11yStrings' );
  var AccessibleSectionNode = require( 'SCENERY_PHET/accessibility/AccessibleSectionNode' );
  var SoundToggleButton = require( 'SCENERY_PHET/buttons/SoundToggleButton' );
  var WireBox = require( 'OHMS_LAW/ohms-law/view/WireBox' );
  var Sound = require( 'VIBE/Sound' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  var OhmsLawSceneSummaryNode = require( 'OHMS_LAW/ohms-law/view/OhmsLawSceneSummaryNode' );

  // audio
  // The sounds themselves can be constants because there is only every one instance of OhmsLawScreenView.
  var ADD_BATTERY_SOUND = new Sound( require( 'audio!OHMS_LAW/add-battery' ) );
  var REMOVE_BATTERY_SOUND = new Sound( require( 'audio!OHMS_LAW/remove-battery' ) );

  // a11y strings
  var ohmsLawTitleString = OhmsLawA11yStrings.ohmsLawTitleString;
  var playAreaString = JoistA11yStrings.playAreaString;
  var controlPanelString = JoistA11yStrings.controlPanelString;
  var sliderChangeAlertPatternString = OhmsLawA11yStrings.sliderChangeAlertPatternString;
  var letterRString = OhmsLawA11yStrings.letterRString;
  var letterVString = OhmsLawA11yStrings.letterVString;
  var shrinksString = OhmsLawA11yStrings.shrinksString;
  var growsString = OhmsLawA11yStrings.growsString;
  var resistanceString = OhmsLawA11yStrings.resistanceString;
  var voltageString = OhmsLawA11yStrings.voltageString;
  var voltsString = OhmsLawA11yStrings.voltsString;
  var ohmsString = OhmsLawA11yStrings.ohmsString;

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
      accessibleLabel: ohmsLawTitleString
    } );
    var self = this;

    // Node of ohm's law equation. Layout is hardwired, see FormulaNode.
    var formulaNode = new FormulaNode( model, tandem.createTandem( 'formulaNode' ), {
      pickable: false
    } );

    // Circuit node with readout node
    var wireBox = new WireBox( model, tandem.createTandem( 'wireBox' ), {
      pickable: false
    } );

    // a11y - the scene summary to be read by assistive technology
    this.addChild( new OhmsLawSceneSummaryNode( model, formulaNode, wireBox ) );

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

    // formula and circuit are contained in a "Play Area", structure available to assistive technology
    var playAreaNode = new AccessibleSectionNode( playAreaString );
    this.addChild( playAreaNode );

    // sound and reset all buttons contained in a "Control Panel", structure available to assistive technology
    var controlPanelSectionNode = new AccessibleSectionNode( controlPanelString );
    this.addChild( controlPanelSectionNode );

    var buttons = new HBox( {
      spacing: 60, // empirically determined
      children: [ resetAllButton, soundToggleButton ],
      accessibleOrder: [ soundToggleButton, resetAllButton ]
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

      // a11y - when V changes, announce an alert that describes the change
      var sizeChange = voltage - oldVoltage > 0 ? growsString : shrinksString;
      var fixedCurrent = Util.toFixed( model.currentProperty.get(), OhmsLawConstants.CURRENT_SIG_FIGS );
      var fixedVoltage = Util.toFixed( voltage, OhmsLawConstants.VOLTAGE_SIG_FIGS );

      var alert = self.getValueChangeAlert( letterVString, sizeChange, sizeChange, fixedCurrent, voltageString, fixedVoltage, voltsString );
      UtteranceQueue.addToBack( alert );
    } );

    // when resistance changes, generate an alert that describes this
    model.resistanceProperty.lazyLink( function( resistance, oldResistance ) {

      var resistanceChange = resistance - oldResistance;
      var fixedResistance = Util.toFixed( resistance, OhmsLawConstants.RESISTANCE_SIG_FIGS );
      var fixedCurrent = Util.toFixed( model.currentProperty.get(), OhmsLawConstants.CURRENT_SIG_FIGS );

      var rSizeChange = resistanceChange > 0 ? growsString : shrinksString;
      var iSizeChange = resistanceChange < 0 ? growsString : shrinksString;

      var alert = self.getValueChangeAlert( letterRString, rSizeChange, iSizeChange, fixedCurrent, resistanceString, fixedResistance, ohmsString );
      UtteranceQueue.addToBack( alert );
    } );

    this.mutate( {
      tandem: tandem
    } );
  }

  ohmsLaw.register( 'OhmsLawScreenView', OhmsLawScreenView );

  return inherit( ScreenView, OhmsLawScreenView, {

    /**
     * Generate an alert from strings and values that describes a change in the model. Something like
     * "As letter V grows, letter I grows. Current now 10.0 milliamps with voltage at 5.0 volts."
     * 
     * @param  {string} initLetter - letter representing the model property that was changed
     * @param  {string} initSizeChange - string describing change in size of letter representing changed model Property
     * @param  {[type]} iSizeChange - string describing size change of letter I
     * @param  {[type]} currentVal - value of model current Property
     * @param  {[type]} initPropertyString - string describing the model property that changed (like "voltage")
     * @param  {[type]} initVal - new value of Property that changed
     * @param  {[type]} initUnits - units of Property that changed
     * @return {[type]} string
     */
    getValueChangeAlert: function( initLetter, initSizeChange, iSizeChange, currentVal, initPropertyString, initVal, initUnits ) {
      return StringUtils.fillIn( sliderChangeAlertPatternString, {
        initLetter: initLetter,
        initSizeChange: initSizeChange,
        iSizeChange: iSizeChange,
        currentVal: currentVal,
        initProperty: initPropertyString,
        initVal: initVal,
        initUnits: initUnits
      } );
    }
  } );
} );
