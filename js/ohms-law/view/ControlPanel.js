// Copyright 2017-2019, University of Colorado Boulder

/**
 * Container for sliders and adjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const inherit = require( 'PHET_CORE/inherit' );
  const MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  const merge = require( 'PHET_CORE/merge' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  const OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  const OhmsLawModel = require( 'OHMS_LAW/ohms-law/model/OhmsLawModel' );
  const Panel = require( 'SUN/Panel' );
  const SliderUnit = require( 'OHMS_LAW/ohms-law/view/SliderUnit' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Util = require( 'DOT/Util' );
const ValueChangeUtterance = require( 'UTTERANCE_QUEUE/ValueChangeUtterance' );

  // strings
  const resistanceString = require( 'string!OHMS_LAW/resistance' );
  const resistanceSymbolString = require( 'string!OHMS_LAW/resistanceSymbol' );
  const voltageString = require( 'string!OHMS_LAW/voltage' );
  const voltageSymbolString = require( 'string!OHMS_LAW/voltageSymbol' );
  const voltageUnitsString = require( 'string!OHMS_LAW/voltageUnits' );

  // a11y strings - these strings are not meant to be translatable until the translation utility
  // can provide translators with context
  const resistanceUnitsPatternString = OhmsLawA11yStrings.resistanceUnitsPattern.value;
  const voltageUnitsPatternString = OhmsLawA11yStrings.voltageUnitsPattern.value;
  const resistanceSliderLabelString = OhmsLawA11yStrings.resistanceSliderLabel.value;
  const voltageSliderLabelString = OhmsLawA11yStrings.voltageSliderLabel.value;
  const sliderControlsString = OhmsLawA11yStrings.sliderControls.value;
  const slidersDescriptionString = OhmsLawA11yStrings.slidersDescription.value;
  const sliderChangeAlertPatternString = OhmsLawA11yStrings.sliderChangeAlertPattern.value;
  const letterRString = OhmsLawA11yStrings.letterR.value;
  const letterVString = OhmsLawA11yStrings.letterV.value;
  const shrinksString = OhmsLawA11yStrings.shrinks.value;
  const growsString = OhmsLawA11yStrings.grows.value;
  const aLotString = OhmsLawA11yStrings.aLot.value;

  // constants
  const NUMBER_OF_LETTER_SIZES = OhmsLawA11yStrings.numberOfSizes.value; // a11y - the number of sizes that letters can be described as.

  /**
   * @param {Property.<number>} voltageProperty
   * @param {Property.<number>} resistanceProperty
   * @param {Property.<number>} currentProperty
   * @param {Tandem} tandem
   * @param options
   * @constructor
   */
  function ControlPanel( voltageProperty, resistanceProperty, currentProperty, tandem, options ) {

    const self = this;

    options = merge( {
      xMargin: 30,
      yMargin: 10,
      lineWidth: 3,
      resize: false,
      preventFit: true, // used to avoid jostling in the control panel when the resistance changes quickly, see https://github.com/phetsims/ohms-law/issues/68
      tandem: tandem
    }, options );

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
      tandem.createTandem( 'voltageSlider' ),
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
              const fixedCurrent = Util.toFixed( currentProperty.get(), OhmsLawConstants.CURRENT_SIG_FIGS );

              voltageUtterance.alert = self.getValueChangeAlertString( letterVString, sizeChange, sizeChange, fixedCurrent );
              phet.joist.sim.display.utteranceQueue.addToBack( voltageUtterance );
            }
          }
        },

        decimalPlaces: OhmsLawConstants.VOLTAGE_SIG_FIGS
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

        // Get display values for the alert
        const fixedCurrent = Util.toFixed( currentProperty.get(), OhmsLawConstants.CURRENT_SIG_FIGS );

        const rSizeChange = resistanceChange > 0 ? growsString : shrinksString;
        let iSizeChange = resistanceChange < 0 ? growsString : shrinksString;
        iSizeChange += Math.abs( currentChange ) > twoSizeCurrentThreshhold ? ' ' + aLotString : '';

        resistanceUtterance.alert = self.getValueChangeAlertString( letterRString, rSizeChange, iSizeChange, fixedCurrent );
        phet.joist.sim.display.utteranceQueue.addToBack( resistanceUtterance );
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
      tandem.createTandem( 'resistanceSlider' ),
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
        decimalPlaces: OhmsLawConstants.RESISTANCE_SIG_FIGS
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

    // a11y - the content is aria-labelledby the content's label sibling
    content.addAriaLabelledbyAssociation( {
      thisElementName: AccessiblePeer.PRIMARY_SIBLING,
      otherNode: content,
      otherElementName: AccessiblePeer.LABEL_SIBLING
    } );

    Panel.call( this, content, options );
  }

  ohmsLaw.register( 'ControlPanel', ControlPanel );

  return inherit( Panel, ControlPanel, {

    /**
     * Generate an alert from strings and values that describes a change in the model. Something like
     * "As letter V grows, letter I grows. Current now 10.0 milliamps with voltage at 5.0 volts."
     * Used for a11y.
     *
     * @param  {string} initLetter - letter representing the model property that was changed
     * @param  {string} initSizeChange - string describing change in size of letter representing changed model Property
     * @param  {string} iSizeChange - string describing size change of letter I
     * @param  {number} currentVal - value of model current Property
     * @returns {string} string
     */
    getValueChangeAlertString: function( initLetter, initSizeChange, iSizeChange, currentVal ) {
      return StringUtils.fillIn( sliderChangeAlertPatternString, {
        initLetter: initLetter,
        initSizeChange: initSizeChange,
        iSizeChange: iSizeChange,
        currentVal: currentVal
      } );
    }
  } );
} );