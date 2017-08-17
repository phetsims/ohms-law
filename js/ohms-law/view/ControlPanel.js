// Copyright 2013-2017, University of Colorado Boulder

/**
 * Container for sliders and adjacent text
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var Panel = require( 'SUN/Panel' );
  var SliderUnit = require( 'OHMS_LAW/ohms-law/view/SliderUnit' );
  var OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );

  // strings
  var resistanceUnitsString = require( 'string!OHMS_LAW/resistanceUnits' );
  var resistanceSymbolString = require( 'string!OHMS_LAW/resistanceSymbol' );
  var resistanceString = require( 'string!OHMS_LAW/resistance' );
  var voltageUnitsString = require( 'string!OHMS_LAW/voltageUnits' );
  var voltageSymbolString = require( 'string!OHMS_LAW/voltageSymbol' );
  var voltageString = require( 'string!OHMS_LAW/voltage' );

  // a11y strings - these strings are not meant to be translatable until the translation utility
  // can provide translators with context
  var resistanceUnitsPatternString = OhmsLawA11yStrings.resistanceUnitsPatternString;
  var voltageUnitsPatternString = OhmsLawA11yStrings.voltageUnitsPatternString;
  var resistanceSliderLabelString = OhmsLawA11yStrings.resistanceSliderLabelString;
  var voltageSliderLabelString = OhmsLawA11yStrings.voltageSliderLabelString;

  /**
   * @param {Property.<number>} voltageProperty
   * @param {Property.<number>} resistanceProperty
   * @param {Tandem} tandem
   * @param options
   * @constructor
   */
  function ControlPanel( voltageProperty, resistanceProperty, tandem, options ) {

    options = _.extend( {
      xMargin: 30,
      yMargin: 10,
      lineWidth: 3,
      resize: false,
      tandem: tandem
    }, options );

    // Create the voltage slider with readout and labels
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
        accessibleValuePattern: voltageUnitsPatternString
      } );

    // Create the resistance slider with readout and labels
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
        accessibleDecimalPlaces: OhmsLawConstants.RESISTANCE_SIG_FIGS
      } );

    // Use a content node so that the Panel can surround it fully
    var content = new HBox( {
        spacing: 30, // empirically determined
        children: [ voltageSlider, resistanceSlider ],

        // a11y - contain the sliders in a list
        tagName: 'ul'
      }
    );

    Panel.call( this, content, options );
  }

  ohmsLaw.register( 'ControlPanel', ControlPanel );

  return inherit( Panel, ControlPanel );
} );
