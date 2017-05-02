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
  var Node = require( 'SCENERY/nodes/Node' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var Panel = require( 'SUN/Panel' );
  var SliderUnit = require( 'OHMS_LAW/ohms-law/view/SliderUnit' );
  var Util = require( 'DOT/Util' );

  // strings
  var resistanceUnitsString = require( 'string!OHMS_LAW/resistanceUnits' );
  var resistanceSymbolString = require( 'string!OHMS_LAW/resistanceSymbol' );
  var resistanceString = require( 'string!OHMS_LAW/resistance' );
  var voltageUnitsString = require( 'string!OHMS_LAW/voltageUnits' );
  var voltageSymbolString = require( 'string!OHMS_LAW/voltageSymbol' );
  var voltageString = require( 'string!OHMS_LAW/voltage' );

  /**
   * @param {Property.<number>} voltageProperty
   * @param {Property.<number>} resistanceProperty
   * @constructor
   */
  function ControlPanel( voltageProperty, resistanceProperty ) {

    // create the voltage slider with readout and labels
    var voltageSlider = new SliderUnit(
      voltageProperty,
      OhmsLawConstants.VOLTAGE_RANGE,
      voltageSymbolString,
      voltageString,
      voltageUnitsString );

    // create the resistance slider with readout and labels
    var resistanceSlider = new SliderUnit(
      resistanceProperty,
      OhmsLawConstants.RESISTANCE_RANGE,
      resistanceSymbolString,
      resistanceString,
      resistanceUnitsString,
      { numberDecimalPlaces: 0 } );

    var content = new Node();
    content.addChild( voltageSlider );
    content.addChild( resistanceSlider );

    // set the horizontal position of the sliders, defining the middle slider as zero
    voltageSlider.centerX = -OhmsLawConstants.SLIDERS_HORIZONTAL_SEPARATION / 2;
    resistanceSlider.centerX = voltageSlider.centerX + OhmsLawConstants.SLIDERS_HORIZONTAL_SEPARATION;

    Panel.call( this, content, {
      xMargin: 30,
      yMargin: 20,
      lineWidth: 3,
      resize: false
    } );
  }

  ohmsLaw.register( 'ControlPanel', ControlPanel );

  return inherit( Panel, ControlPanel );
} );
