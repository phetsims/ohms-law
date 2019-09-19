// Copyright 2013-2019, University of Colorado Boulder

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
  const DiscreteSoundGenerator = require( 'TAMBO/sound-generators/DiscreteSoundGenerator' );
  const FormulaNode = require( 'OHMS_LAW/ohms-law/view/FormulaNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const InvertedBooleanProperty = require( 'TAMBO/InvertedBooleanProperty' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  const OhmsLawScreenSummaryNode = require( 'OHMS_LAW/ohms-law/view/OhmsLawScreenSummaryNode' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ResetAllSoundGenerator = require( 'TAMBO/sound-generators/ResetAllSoundGenerator' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const soundManager = require( 'TAMBO/soundManager' );
  const WireBox = require( 'OHMS_LAW/ohms-law/view/WireBox' );

  // sounds
  const sliderClick = require( 'sound!OHMS_LAW/slider-click-001.mp3' );

  /**
   * @param {OhmsLawModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function OhmsLawScreenView( model, tandem ) {

    const self = this;

    ScreenView.call( this, {
      tandem: tandem,
      screenSummaryContent: new OhmsLawScreenSummaryNode( model )
    } );

    // Node of ohm's law equation. Layout is hardwired, see FormulaNode.
    const formulaNode = new FormulaNode( model, tandem.createTandem( 'formulaNode' ), {
      pickable: false
    } );

    // Circuit node with readout node
    const wireBox = new WireBox( model, tandem.createTandem( 'wireBox' ), {
      pickable: false
    } );

    // create the control panel with sliders
    const controlPanel = new ControlPanel(
      model.voltageProperty,
      model.resistanceProperty,
      model.currentProperty,
      tandem.createTandem( 'controlPanel' )
    );

    // sound generators for voltage and resistance
    const resetNotInProgress = new InvertedBooleanProperty( model.resetInProgressProperty );
    soundManager.addSoundGenerator( new DiscreteSoundGenerator(
      model.voltageProperty,
      OhmsLawConstants.VOLTAGE_RANGE,
      {
        sound: sliderClick,
        numBins: 6,
        enableControlProperties: [resetNotInProgress],
        initialOutputLevel: 0.25,
        alwaysPlayOnChangesProperty: controlPanel.sliderBeingDraggedByKeyboard
      }
    ) );
    soundManager.addSoundGenerator( new DiscreteSoundGenerator(
      model.resistanceProperty,
      OhmsLawConstants.RESISTANCE_RANGE,
      {
        sound: sliderClick,
        numBins: 6,
        enableControlProperties: [resetNotInProgress],
        initialOutputLevel: 0.2,
        alwaysPlayOnChangesProperty: controlPanel.sliderBeingDraggedByKeyboard
      }
    ) );

    // sound generator for current
    this.currentSoundGenerator = new CurrentSoundGenerator( model.currentProperty, {
      initialOutputLevel: 0.4
    } );
    soundManager.addSoundGenerator( this.currentSoundGenerator );

    // add the reset button
    const resetAllButton = new ResetAllButton( {
      radius: 28,
      listener: function() {
        model.reset();
        self.currentSoundGenerator.reset();
      },
      tandem: tandem.createTandem( 'resetAllButton' )
    } );

    // hook up the reset all sound generator
    soundManager.addSoundGenerator( new ResetAllSoundGenerator( model.resetInProgressProperty, {
      initialOutputLevel: 0.7
    } ) );

    // children
    this.playAreaNode.addChild( formulaNode );
    this.playAreaNode.addChild( wireBox );
    this.playAreaNode.addChild( controlPanel );
    this.controlAreaNode.addChild( resetAllButton );

    // layout for the screen
    formulaNode.centerY = this.layoutBounds.bottom / 4.75;

    wireBox.centerX = formulaNode.centerX;
    wireBox.centerY = this.layoutBounds.bottom * .74; // empirically determined

    controlPanel.right = this.layoutBounds.width - 50; // empirically determined
    controlPanel.centerY = this.layoutBounds.centerY - resetAllButton.height / 2;
    resetAllButton.right = controlPanel.right;
    resetAllButton.bottom = this.layoutBounds.bottom - 20;
  }

  ohmsLaw.register( 'OhmsLawScreenView', OhmsLawScreenView );

  return inherit( ScreenView, OhmsLawScreenView, {

    step: function( dt ) {
      this.currentSoundGenerator.step( dt );
    }
  } );
} );
