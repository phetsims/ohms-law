// Copyright 2013-2022, University of Colorado Boulder

/**
 * Screen view for the Ohm's Law simulation
 *
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import DiscreteSoundGenerator from '../../../../tambo/js/sound-generators/DiscreteSoundGenerator.js';
import soundManager from '../../../../tambo/js/soundManager.js';
import click_mp3 from '../../../../tambo/sounds/click_mp3.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawConstants from '../OhmsLawConstants.js';
import ControlPanel from './ControlPanel.js';
import CurrentSoundGenerator from './CurrentSoundGenerator.js';
import FormulaNode from './FormulaNode.js';
import OhmsLawDescriber from './OhmsLawDescriber.js';
import OhmsLawScreenSummaryNode from './OhmsLawScreenSummaryNode.js';
import UnitsRadioButtonContainer from './UnitsRadioButtonContainer.js';
import WireBox from './WireBox.js';

// constants
const SLIDER_CLICK_LEVEL = 0.25;

class OhmsLawScreenView extends ScreenView {

  /**
   * @param {OhmsLawModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    const ohmsLawDescriber = new OhmsLawDescriber( model );

    super( {
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
    const resetNotInProgress = DerivedProperty.not( model.resetInProgressProperty );
    soundManager.addSoundGenerator( new DiscreteSoundGenerator(
      model.voltageProperty,
      OhmsLawConstants.VOLTAGE_RANGE,
      {
        sound: click_mp3,
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
        sound: click_mp3,
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
      listener: () => {
        model.reset();
        this.currentSoundGenerator.reset();
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

  // @public
  step( dt ) {
    this.currentSoundGenerator.step( dt );
  }
}

ohmsLaw.register( 'OhmsLawScreenView', OhmsLawScreenView );
export default OhmsLawScreenView;