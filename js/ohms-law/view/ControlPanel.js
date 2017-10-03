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
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var Panel = require( 'SUN/Panel' );
  var SliderUnit = require( 'OHMS_LAW/ohms-law/view/SliderUnit' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Util = require( 'DOT/Util' );
  var UtteranceQueue = require( 'SCENERY_PHET/accessibility/UtteranceQueue' );
  var Utterance = require( 'SCENERY_PHET/accessibility/Utterance' );

  // strings
  var resistanceString = require( 'string!OHMS_LAW/resistance' );
  var resistanceSymbolString = require( 'string!OHMS_LAW/resistanceSymbol' );
  var resistanceUnitsString = require( 'string!OHMS_LAW/resistanceUnits' );
  var voltageString = require( 'string!OHMS_LAW/voltage' );
  var voltageSymbolString = require( 'string!OHMS_LAW/voltageSymbol' );
  var voltageUnitsString = require( 'string!OHMS_LAW/voltageUnits' );

  // a11y strings - these strings are not meant to be translatable until the translation utility
  // can provide translators with context
  var resistanceUnitsPatternString = OhmsLawA11yStrings.resistanceUnitsPatternString;
  var voltageUnitsPatternString = OhmsLawA11yStrings.voltageUnitsPatternString;
  var resistanceSliderLabelString = OhmsLawA11yStrings.resistanceSliderLabelString;
  var voltageSliderLabelString = OhmsLawA11yStrings.voltageSliderLabelString;
  var sliderControlsString = OhmsLawA11yStrings.sliderControlsString;
  var slidersDescriptionString = OhmsLawA11yStrings.slidersDescriptionString;

  // a11y strings
  var sliderChangeAlertPatternString = OhmsLawA11yStrings.sliderChangeAlertPatternString;
  var letterRString = OhmsLawA11yStrings.letterRString;
  var letterVString = OhmsLawA11yStrings.letterVString;
  var shrinksString = OhmsLawA11yStrings.shrinksString;
  var growsString = OhmsLawA11yStrings.growsString;
  var resistanceAlertString = OhmsLawA11yStrings.resistanceAlertString;
  var voltageAlertString = OhmsLawA11yStrings.voltageAlertString;
  var voltsString = OhmsLawA11yStrings.voltsString;
  var ohmsString = OhmsLawA11yStrings.ohmsString;

  /**
   * @param {Property.<number>} voltageProperty
   * @param {Property.<number>} resistanceProperty
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
            var fixedVoltage = Util.toFixed( newVoltage, OhmsLawConstants.VOLTAGE_SIG_FIGS );

            var alert = self.getValueChangeAlert( letterVString, sizeChange, sizeChange, fixedCurrent, voltageAlertString, fixedVoltage, voltsString );
            UtteranceQueue.addToBack( new Utterance( alert, { typeId: 'voltageAlert' } ) );
          }
        }
      } );

    // Create the resistance slider with readout and labels
    var oldResistance; // stored on startDrag
    var newResistance; // stored on endDrag
    var resistanceSlider = new SliderUnit(
      resistanceProperty,
      OhmsLawConstants.RESISTANCE_RANGE,
      resistanceSymbolString,
      resistanceString,
      resistanceUnitsString,
      resistanceSliderLabelString,
      tandem.createTandem( 'resistanceSlider' ),
      {
        keyboardStep: 20, // ohms
        shiftKeyboardStep: 1, // ohms
        accessibleValuePattern: resistanceUnitsPatternString,
        accessibleDecimalPlaces: OhmsLawConstants.RESISTANCE_SIG_FIGS,
        startDrag: function() {
          oldResistance = resistanceProperty.get();
        },
        endDrag: function() {
          newResistance = resistanceProperty.get();

          if ( newResistance !== oldResistance ) {
            var resistanceChange = newResistance - oldResistance;
            var fixedResistance = Util.toFixed( newResistance, OhmsLawConstants.RESISTANCE_SIG_FIGS );
            var fixedCurrent = Util.toFixed( currentProperty.get(), OhmsLawConstants.CURRENT_SIG_FIGS );

            var rSizeChange = resistanceChange > 0 ? growsString : shrinksString;
            var iSizeChange = resistanceChange < 0 ? growsString : shrinksString;

            var alert = self.getValueChangeAlert( letterRString, rSizeChange, iSizeChange, fixedCurrent, resistanceAlertString, fixedResistance, ohmsString );
            UtteranceQueue.addToBack( new Utterance( alert, {
              typeId: 'resistanceAlert'
            } ) );
          }
        }
      } );

    // Use a content node so that the Panel can surround it fully
    var content = new HBox( {
      spacing: 30, // empirically determined
      children: [ voltageSlider, resistanceSlider ],

      // a11y - contain the sliders in a list
      parentContainerTagName: 'div',
      labelTagName: 'h3',
      prependLabels: true,
      tagName: 'ul',
      accessibleLabel: sliderControlsString,
      accessibleDescription: slidersDescriptionString
    } );

    // a11y - explicitly define that the parent container of the content is labelledby the content's own
    // label through association with the aria-labelledby attribute
    content.ariaLabelContent = AccessiblePeer.LABEL;
    content.ariaLabelledContent = AccessiblePeer.PARENT_CONTAINER;
    content.setAriaLabelledByNode( content );

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
     * @param  {string} initPropertyString - string describing the model property that changed (like "voltage")
     * @param  {number} initVal - new value of Property that changed
     * @param  {string} initUnits - units of Property that changed
     * @return {string} string
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
