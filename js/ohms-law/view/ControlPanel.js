// Copyright 2017, University of Colorado Boulder

/**
 * Container for sliders and adjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var AccessiblePeer = require( 'SCENERY/accessibility/AccessiblePeer' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var MathSymbols = require( 'SCENERY_PHET/MathSymbols' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var OhmsLawModel = require( 'OHMS_LAW/ohms-law/model/OhmsLawModel' );
  var Panel = require( 'SUN/Panel' );
  var SliderUnit = require( 'OHMS_LAW/ohms-law/view/SliderUnit' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );
  var Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );
  var utteranceQueue = require( 'SCENERY_PHET/accessibility/utteranceQueue' );

  // strings
  var resistanceString = require( 'string!OHMS_LAW/resistance' );
  var resistanceSymbolString = require( 'string!OHMS_LAW/resistanceSymbol' );
  var voltageString = require( 'string!OHMS_LAW/voltage' );
  var voltageSymbolString = require( 'string!OHMS_LAW/voltageSymbol' );
  var voltageUnitsString = require( 'string!OHMS_LAW/voltageUnits' );

  // a11y strings - these strings are not meant to be translatable until the translation utility
  // can provide translators with context
  var resistanceUnitsPatternString = OhmsLawA11yStrings.resistanceUnitsPattern.value;
  var voltageUnitsPatternString = OhmsLawA11yStrings.voltageUnitsPattern.value;
  var resistanceSliderLabelString = OhmsLawA11yStrings.resistanceSliderLabel.value;
  var voltageSliderLabelString = OhmsLawA11yStrings.voltageSliderLabel.value;
  var sliderControlsString = OhmsLawA11yStrings.sliderControls.value;
  var slidersDescriptionString = OhmsLawA11yStrings.slidersDescription.value;

  // a11y strings
  var sliderChangeAlertPatternString = OhmsLawA11yStrings.sliderChangeAlertPattern.value;
  var letterRString = OhmsLawA11yStrings.letterR.value;
  var letterVString = OhmsLawA11yStrings.letterV.value;
  var shrinksString = OhmsLawA11yStrings.shrinks.value;
  var growsString = OhmsLawA11yStrings.grows.value;
  var aLotString = OhmsLawA11yStrings.aLot.value;

  // constants
  var NUMBER_OF_LETTER_SIZES = OhmsLawA11yStrings.numberOfSizes.value; // a11y - the number of sizes that letters can be described as.

  /**
   * @param {Property.<number>} voltageProperty
   * @param {Property.<number>} resistanceProperty
   * @param {Property.<number>} currentProperty
   * @param {Tandem} tandem
   * @param options
   * @constructor
   */
  function ControlPanel( voltageProperty, resistanceProperty, currentProperty, tandem, options ) {

    var self = this;

    options = _.extend( {
      xMargin: 30,
      yMargin: 10,
      lineWidth: 3,
      resize: false,
      preventFit: true, // used to avoid jostling in the control panel when the the resistance changes quickly, see https://github.com/phetsims/ohms-law/issues/68
      tandem: tandem
    }, options );

    // Create the voltage slider with readout and labels
    var oldVoltage; // stored on startDrag;
    var newVoltage; // stored on endDrag;
    var voltageSlider = new SliderUnit(
      voltageProperty,
      OhmsLawConstants.VOLTAGE_RANGE,
      voltageSymbolString,
      voltageString,
      voltageUnitsString,
      voltageSliderLabelString,
      tandem.createTandem( 'voltageSlider' ),
      {
        keyboardStep: 0.5, // volts
        shiftKeyboardStep: 0.1, // volts
        accessibleDecimalPlaces: OhmsLawConstants.VOLTAGE_SIG_FIGS,
        accessibleValuePattern: voltageUnitsPatternString,
        startDrag: function() {
          oldVoltage = voltageProperty.get();
        },
        endDrag: function() {
          newVoltage = voltageProperty.get();

          if ( oldVoltage !== newVoltage ) {
            // a11y - when V changes, announce an alert that describes the change
            var sizeChange = newVoltage - oldVoltage > 0 ? growsString : shrinksString;
            var fixedCurrent = Util.toFixed( currentProperty.get(), OhmsLawConstants.CURRENT_SIG_FIGS );

            var alert = self.getValueChangeAlertString( letterVString, sizeChange, sizeChange, fixedCurrent );
            utteranceQueue.addToBack( new Utterance( alert, { typeId: 'voltageAlert' } ) );
          }
        }
      } );

    var oldResistance; // stored on startDrag
    var newResistance; // stored on endDrag
    var oldCurrent;
    var newCurrent;

    // based on the number of sizes for the formula letters
    var currentRangePerSize = (OhmsLawModel.getCurrentRange().max - OhmsLawModel.getCurrentRange().min) / NUMBER_OF_LETTER_SIZES;
    var twoSizeCurrentThreshhold = currentRangePerSize * 2; // amount of current that must change to adjust change the current 2 a11y sizes.

    // a11y - This function will create the string alert to notify the resistance slider has been changed.
    var endResistanceDrag = function() {
      newResistance = resistanceProperty.get();
      newCurrent = currentProperty.get();

      if ( newResistance !== oldResistance ) {
        var resistanceChange = newResistance - oldResistance;
        var currentChange = newCurrent - oldCurrent;

        // Get display values for the alert
        var fixedCurrent = Util.toFixed( currentProperty.get(), OhmsLawConstants.CURRENT_SIG_FIGS );

        var rSizeChange = resistanceChange > 0 ? growsString : shrinksString;
        var iSizeChange = resistanceChange < 0 ? growsString : shrinksString;
        iSizeChange += Math.abs( currentChange ) > twoSizeCurrentThreshhold ? ' ' + aLotString : '';

        var alert = self.getValueChangeAlertString( letterRString, rSizeChange, iSizeChange, fixedCurrent );
        utteranceQueue.addToBack( new Utterance( alert, {
          typeId: 'resistanceAlert'
        } ) );
      }
    };


    // Create the resistance slider with readout and labels
    var resistanceSlider = new SliderUnit(
      resistanceProperty,
      OhmsLawConstants.RESISTANCE_RANGE,
      resistanceSymbolString,
      resistanceString,
      MathSymbols.OHMS,
      resistanceSliderLabelString,
      tandem.createTandem( 'resistanceSlider' ),
      {
        keyboardStep: 20, // ohms
        shiftKeyboardStep: 1, // ohms
        accessibleValuePattern: resistanceUnitsPatternString,
        accessibleDecimalPlaces: OhmsLawConstants.RESISTANCE_SIG_FIGS,
        startDrag: function() {
          oldResistance = resistanceProperty.get();
          oldCurrent = currentProperty.get();
        },
        endDrag: endResistanceDrag
      } );

    // Use a content node so that the Panel can surround it fully
    var content = new HBox( {
      spacing: 30, // empirically determined
      children: [ voltageSlider, resistanceSlider ],

      // a11y - contain the sliders in a list
      labelTagName: 'h3',
      tagName: 'ul',
      labelContent: sliderControlsString,
      descriptionContent: slidersDescriptionString
    } );

    content.setAriaLabelledByNode( content );
    content.ariaLabelContent = AccessiblePeer.LABEL_SIBLING;

    Panel.call( this, content, options );
  }

  ohmsLaw.register( 'ControlPanel', ControlPanel );

  return inherit( Panel, ControlPanel, {

    /**
     * Generate an alert from strings and values that describes a change in the model. Something like
     * "As letter V grows, letter I grows. Current now 10.0 milliamps with voltage at 5.0 volts."
     *
     * @param  {string} initLetter - letter representing the model property that was changed
     * @param  {string} initSizeChange - string describing change in size of letter representing changed model Property
     * @param  {string} iSizeChange - string describing size change of letter I
     * @param  {number} currentVal - value of model current Property
     * @return {string} string
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
