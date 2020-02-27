// Copyright 2017-2020, University of Colorado Boulder

/**
 * Container for sliders and adjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import MathSymbols from '../../../../scenery-phet/js/MathSymbols.js';
import HBox from '../../../../scenery/js/nodes/HBox.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import ValueChangeUtterance from '../../../../utterance-queue/js/ValueChangeUtterance.js';
import ohmsLawStrings from '../../ohms-law-strings.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawModel from '../model/OhmsLawModel.js';
import OhmsLawA11yStrings from '../OhmsLawA11yStrings.js';
import OhmsLawConstants from '../OhmsLawConstants.js';
import SliderUnit from './SliderUnit.js';

const resistanceString = ohmsLawStrings.resistance;
const resistanceSymbolString = ohmsLawStrings.resistanceSymbol;
const voltageString = ohmsLawStrings.voltage;
const voltageSymbolString = ohmsLawStrings.voltageSymbol;
const voltageUnitsString = ohmsLawStrings.voltageUnits;

// a11y strings - these strings are not meant to be translatable until the translation utility
// can provide translators with context
const resistanceUnitsPatternString = OhmsLawA11yStrings.resistanceUnitsPattern.value;
const voltageUnitsPatternString = OhmsLawA11yStrings.voltageUnitsPattern.value;
const resistanceSliderLabelString = OhmsLawA11yStrings.resistanceSliderLabel.value;
const voltageSliderLabelString = OhmsLawA11yStrings.voltageSliderLabel.value;
const sliderControlsString = OhmsLawA11yStrings.sliderControls.value;
const slidersDescriptionString = OhmsLawA11yStrings.slidersDescription.value;
const letterRString = OhmsLawA11yStrings.letterR.value;
const letterVString = OhmsLawA11yStrings.letterV.value;
const shrinksString = OhmsLawA11yStrings.shrinks.value;
const growsString = OhmsLawA11yStrings.grows.value;
const aLotString = OhmsLawA11yStrings.aLot.value;

// constants
const NUMBER_OF_LETTER_SIZES = OhmsLawA11yStrings.numberOfSizes.value; // a11y - the number of sizes that letters can be described as.

/**
 * @param {OhmsLawModel} model
 * @param {OhmsLawDescriber} ohmsLawDescriber
 * @param {Object} [options]
 * @constructor
 */
function ControlPanel( model, ohmsLawDescriber, options ) {

  options = merge( {
    xMargin: 30,
    yMargin: 10,
    lineWidth: 3,
    resize: false,
    preventFit: true, // used to avoid jostling in the control panel when the resistance changes quickly, see https://github.com/phetsims/ohms-law/issues/68
    tandem: Tandem.REQUIRED
  }, options );

  const voltageProperty = model.voltageProperty;
  const resistanceProperty = model.resistanceProperty;
  const currentProperty = model.currentProperty;

  // a11y - to alert changes to assistive devices
  const resistanceUtterance = new ValueChangeUtterance();
  const voltageUtterance = new ValueChangeUtterance();

  // Create the voltage slider with readout and labels
  let oldVoltage; // stored on startDrag;
  let newVoltage; // stored on endDrag;
  const voltageSlider = new SliderUnit(
    voltageProperty,
    OhmsLawConstants.VOLTAGE_RANGE,
    voltageSymbolString,
    voltageString,
    voltageUnitsString,
    voltageSliderLabelString,
    {
      sliderOptions: {

        // a11y
        keyboardStep: 0.5, // volts
        a11yCreateAriaValueText: value => StringUtils.fillIn( voltageUnitsPatternString, { value: value } ),
        startDrag: function() {
          oldVoltage = voltageProperty.get();
        },
        endDrag: function() {
          newVoltage = voltageProperty.get();

          if ( oldVoltage !== newVoltage ) {
            // a11y - when V changes, announce an alert that describes the change
            const sizeChange = newVoltage - oldVoltage > 0 ? growsString : shrinksString;
            voltageUtterance.alert = ohmsLawDescriber.getValueChangeAlertString( letterVString, sizeChange, sizeChange );
            phet.joist.sim.utteranceQueue.addToBack( voltageUtterance );
          }
        }
      },

      decimalPlaces: OhmsLawConstants.VOLTAGE_SIG_FIGS,
      tandem: options.tandem.createTandem( 'voltageSlider' )
    }
  );

  let oldResistance; // stored on startDrag
  let newResistance; // stored on endDrag
  let oldCurrent;
  let newCurrent;

  // based on the number of sizes for the formula letters
  const currentRangePerSize = ( OhmsLawModel.getCurrentRange().max - OhmsLawModel.getCurrentRange().min ) / NUMBER_OF_LETTER_SIZES;
  const twoSizeCurrentThreshhold = currentRangePerSize * 2; // amount of current that must change to adjust change the current 2 a11y sizes.

  // a11y - This function will create the string alert to notify the resistance slider has been changed.
  const endResistanceDrag = function() {
    newResistance = resistanceProperty.get();
    newCurrent = currentProperty.get();

    if ( newResistance !== oldResistance ) {
      const resistanceChange = newResistance - oldResistance;
      const currentChange = newCurrent - oldCurrent;

      const rSizeChange = resistanceChange > 0 ? growsString : shrinksString;
      let iSizeChange = resistanceChange < 0 ? growsString : shrinksString;
      iSizeChange += Math.abs( currentChange ) > twoSizeCurrentThreshhold ? ' ' + aLotString : '';

      resistanceUtterance.alert = ohmsLawDescriber.getValueChangeAlertString( letterRString, rSizeChange, iSizeChange );
      phet.joist.sim.utteranceQueue.addToBack( resistanceUtterance );
    }
  };

  // Create the resistance slider with readout and labels
  const resistanceSlider = new SliderUnit(
    resistanceProperty,
    OhmsLawConstants.RESISTANCE_RANGE,
    resistanceSymbolString,
    resistanceString,
    MathSymbols.OHMS,
    resistanceSliderLabelString,
    {
      sliderOptions: {

        // a11y
        keyboardStep: 20, // ohms
        shiftKeyboardStep: 1, // ohms
        a11yCreateAriaValueText: value => StringUtils.fillIn( resistanceUnitsPatternString, { value: value } ),
        startDrag: function() {
          oldResistance = resistanceProperty.get();
          oldCurrent = currentProperty.get();
        },
        endDrag: endResistanceDrag
      },
      decimalPlaces: OhmsLawConstants.RESISTANCE_SIG_FIGS,
      tandem: options.tandem.createTandem( 'resistanceSlider' )
    } );

  // Use a content node so that the Panel can surround it fully
  const content = new HBox( {
    spacing: 30, // empirically determined
    children: [ voltageSlider, resistanceSlider ],

    // a11y - contain the sliders in a list
    labelTagName: 'h3',
    tagName: 'div',
    labelContent: sliderControlsString,
    descriptionContent: slidersDescriptionString
  } );

  // @public (read-only) {BooleanProperty} - a property that indicates whether either slider is being dragged via
  // keyboard interaction
  this.sliderBeingDraggedByKeyboardProperty = new DerivedProperty(
    [ voltageSlider.sliderDraggingByKeyboardProperty, resistanceSlider.sliderDraggingByKeyboardProperty ],
    function( voltageSliderDraggedByKeyboard, resistanceSliderDraggedByKeyboard ) {
      return voltageSliderDraggedByKeyboard || resistanceSliderDraggedByKeyboard;
    }
  );

  Panel.call( this, content, options );
}

ohmsLaw.register( 'ControlPanel', ControlPanel );

inherit( Panel, ControlPanel );
export default ControlPanel;