// Copyright 2016-2017, University of Colorado Boulder

/**
 * Constants used in multiple locations within the 'Ohms Law' simulation.
 *
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  var OhmsLawConstants = {

    // colors
    BLUE_COLOR: '#0f0ffb',
    BLACK_COLOR: '#000',

    // range for sliders with default values
    RESISTANCE_RANGE: new RangeWithValue( 10, 1000, 500 ), // in ohms
    VOLTAGE_RANGE: new RangeWithValue( 0.1, 9, 4.5 ), // in volts

    // formula
    FONT_FAMILY: 'Times New Roman',

    // control panel
    SLIDERS_HORIZONTAL_SEPARATION: 115,
    SLIDER_UNIT_VERTICAL_OFFSET: 78, // vertical offset measured from top of panel

    // slider unit
    SLIDER_HEIGHT: 210,
    SYMBOL_FONT: new PhetFont( { family: 'Times New Roman', size: 60 } ),
    NAME_FONT: new PhetFont( 16 ),
    READOUT_FONT: new PhetFont( 28 ),
    UNIT_FONT: new PhetFont( 28 ),

    // wire circuit
    WIRE_WIDTH: 550,
    WIRE_HEIGHT: 180,
    WIRE_THICKNESS: 10,

    // battery
    BATTERY_WIDTH: 82,
    BATTERY_HEIGHT: 40,
    AA_VOLTAGE: 1.5 // in volts
  };

  ohmsLaw.register( 'OhmsLawConstants', OhmsLawConstants );

  return OhmsLawConstants;
} );