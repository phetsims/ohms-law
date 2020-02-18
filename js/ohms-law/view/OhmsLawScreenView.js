// Copyright 2013-2020, University of Colorado Boulder

/**
 * Screen view for the Ohm's Law simulation
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const ControlPanel = require( 'OHMS_LAW/ohms-law/view/ControlPanel' );
  const CurrentSoundGenerator = require( 'OHMS_LAW/ohms-law/view/CurrentSoundGenerator' );
  const UnitsRadioButtonContainer = require( 'OHMS_LAW/ohms-law/view/UnitsRadioButtonContainer' );
  const DiscreteSoundGenerator = require( 'TAMBO/sound-generators/DiscreteSoundGenerator' );
  const FormulaNode = require( 'OHMS_LAW/ohms-law/view/FormulaNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const InvertedBooleanProperty = require( 'TAMBO/InvertedBooleanProperty' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  const OhmsLawDescriber = require( 'OHMS_LAW/ohms-law/view/OhmsLawDescriber' );
  const OhmsLawScreenSummaryNode = require( 'OHMS_LAW/ohms-law/view/OhmsLawScreenSummaryNode' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const soundManager = require( 'TAMBO/soundManager' );
  const WireBox = require( 'OHMS_LAW/ohms-law/view/WireBox' );

  // sounds
  const sliderClick = require( 'sound!TAMBO/click-001.mp3' );

  // constants
  const SLIDER_CLICK_LEVEL = 0.25;

  /**
   * @param {OhmsLawModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function OhmsLawScreenView( model, tandem ) {

    const self = this;

    const ohmsLawDescriber = new OhmsLawDescriber( model );

    ScreenView.call( this, {
      tandem: tandem,
      screenSummaryContent: new OhmsLawScreenSummaryNode( model, ohmsLawDescriber )
    } );

    // Node of ohm's law equation. Layout is hardwired, see FormulaNode.
    const formulaNode = new FormulaNode( model, {
      pickable: false,
      tandem: tandem.createTandem( 'formulaNode' )
    } );

    // Circuit node with readout node
    const wireBox = new WireBox( model, ohmsLawDescriber, {
      pickable: false,
      tandem: tandem.createTandem( 'wireBox' )
    } );

    // create the control panel with sliders
    const controlPanel = new ControlPanel( model, ohmsLawDescriber, { tandem: tandem.createTandem( 'controlPanel' ) } );

    // sound generators for voltage and resistance
    const resetNotInProgress = new InvertedBooleanProperty( model.resetInProgressProperty );
    soundManager.addSoundGenerator( new DiscreteSoundGenerator(
      model.voltageProperty,
      OhmsLawConstants.VOLTAGE_RANGE,
      {
        sound: sliderClick,
        numBins: 6,
        enableControlProperties: [ resetNotInProgress ],
        initialOutputLevel: SLIDER_CLICK_LEVEL,
        alwaysPlayOnChangesProperty: controlPanel.sliderBeingDraggedByKeyboardProperty
      }
    ) );
    soundManager.addSoundGenerator( new DiscreteSoundGenerator(
      model.resistanceProperty,
      OhmsLawConstants.RESISTANCE_RANGE,
      {
        sound: sliderClick,
        numBins: 6,
        enableControlProperties: [ resetNotInProgress ],
        initialOutputLevel: SLIDER_CLICK_LEVEL,
        alwaysPlayOnChangesProperty: controlPanel.sliderBeingDraggedByKeyboardProperty
      }
    ) );

    // sound generator for current
    this.currentSoundGenerator = new CurrentSoundGenerator( model.currentProperty, {
      initialOutputLevel: 0.4
    } );
    soundManager.addSoundGenerator( this.currentSoundGenerator );
    const unitsRadioButtonContainer = new UnitsRadioButtonContainer( model.currentUnitsProperty, {
      tandem: tandem
    } );

    // add the reset button
    const resetAllButton = new ResetAllButton( {
      radius: 28,
      listener: function() {
        model.reset();
        self.currentSoundGenerator.reset();
      },
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    // children
    this.pdomPlayAreaNode.addChild( formulaNode );
    this.pdomPlayAreaNode.addChild( wireBox );
    this.pdomPlayAreaNode.addChild( controlPanel );
    this.pdomControlAreaNode.addChild( unitsRadioButtonContainer );
    this.pdomControlAreaNode.addChild( resetAllButton );

    // layout for the screen
    formulaNode.centerY = this.layoutBounds.bottom / 4.75;

    wireBox.centerX = formulaNode.centerX;
    wireBox.bottom = this.layoutBounds.bottom - 30; // empirically determined

    controlPanel.right = this.layoutBounds.width - 50; // empirically determined
    controlPanel.top = this.layoutBounds.top + 20;
    // controlPanel.centerY = this.layoutBounds.centerY - resetAllButton.height / 2;
    resetAllButton.right = controlPanel.right;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;

    // 4 is empirically spacing to better align the top of the readout with the top of the radio button heading.
    unitsRadioButtonContainer.centerY = wireBox.centerY + 4;
    unitsRadioButtonContainer.left = controlPanel.left;
  }

  ohmsLaw.register( 'OhmsLawScreenView', OhmsLawScreenView );

  return inherit( ScreenView, OhmsLawScreenView, {

    step: function( dt ) {
      this.currentSoundGenerator.step( dt );
    }
  } );
} );
