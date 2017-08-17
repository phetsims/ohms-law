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
  var Range = require( 'DOT/Range' );

  // strings
  var tinyString = 'tiny';
  var verySmallString = 'very small';
  var smallString = 'small';
  var mediumSizeString = 'medium size';
  var largeString = 'large';
  var veryLargeString = 'very large';
  var hugeString = 'huge';

  var muchMuchSmallerThanString = 'much much smaller than';
  var muchSmallerThanString = 'much smaller than';
  var somewhatSmallerThanString = 'somewhat smaller than';
  var comparableToString = 'comparable to';
  var someWhatLargerThanString = 'somewhat larger than';
  var muchLargerThanString = 'much larger than';
  var muchMuchLargerThanString = 'much much larger than';

  // constants used by other constants
  var RESISTANCE_RANGE = new RangeWithValue( 10, 1000, 500 ); // in ohms
  var VOLTAGE_RANGE = new RangeWithValue( 0.1, 9, 4.5 ); // in volts

  var WIRE_WIDTH = 505;
  var BATTERIES_OFFSET = 30;
  var AA_VOLTAGE = 1.5; // in volts
  var MAX_NUMBER_OF_BATTERIES = Math.ceil( VOLTAGE_RANGE.max / AA_VOLTAGE );

  var COMPARATIVE_DESCRIPTION_RANGES = {
    MUCH_MUCH_SMALLER: {
      range: new Range( 0, 0.25 ),
      description: muchMuchSmallerThanString
    },
    MUCH_SMALLER: {
      range: new Range( 0.25, 0.50 ), 
      description: muchSmallerThanString
    },
    SOMEWHAT_SMALLER: {
      range: new Range( 0.50, 0.9),
      description: somewhatSmallerThanString
    },
    COMPARABLE: {
      range: new Range( 0.9, 1.10 ),
      description: comparableToString
    },
    SOMEWHAT_LARGER: {
      range: new Range( 1.10, 2.0 ),
      description: someWhatLargerThanString
    },
    MUCH_LARGER: {
      range: new Range( 2.0, 4.0 ),
      description: muchLargerThanString
    },
    MUCH_MUCH_LARGER:{
      range: new Range( 4.0, Number.MAX_VALUE ),
      description: muchMuchLargerThanString
    }
  };

  var OhmsLawConstants = {

    // colors
    BLUE_COLOR: '#0f0ffb',
    BLACK_COLOR: '#000',

    // range for sliders with default values
    RESISTANCE_RANGE: RESISTANCE_RANGE,
    VOLTAGE_RANGE: VOLTAGE_RANGE,

    // formula
    FONT_FAMILY: 'Times New Roman',

    // control panel
    SLIDER_WIDTH: 89,

    // slider unit
    SLIDER_HEIGHT: 210,
    SYMBOL_FONT: new PhetFont( { family: 'Times New Roman', size: 60 } ),
    NAME_FONT: new PhetFont( 16 ),
    READOUT_FONT: new PhetFont( 28 ),
    UNIT_FONT: new PhetFont( 28 ),

    // precision for each of the physical quantities in this sim
    VOLTAGE_SIG_FIGS: 1,
    RESISTANCE_SIG_FIGS: 0,
    CURRENT_SIG_FIGS: 1,

    // wire circuit
    WIRE_WIDTH: WIRE_WIDTH,
    WIRE_HEIGHT: 165,

    // battery
    MAX_NUMBER_OF_BATTERIES: MAX_NUMBER_OF_BATTERIES,
    BATTERIES_OFFSET: BATTERIES_OFFSET,
    BATTERY_HEIGHT: 38,
    AA_VOLTAGE: AA_VOLTAGE,
    BATTERY_WIDTH: ( WIRE_WIDTH - BATTERIES_OFFSET * 2 ) / MAX_NUMBER_OF_BATTERIES,

    // a11y strings
    RELATIVE_SIZE_STRINGS: [ tinyString, verySmallString, smallString, mediumSizeString,
      largeString, veryLargeString, hugeString ],

    COMPARISON_SIZE_STRINGS: [ muchMuchSmallerThanString, muchSmallerThanString, somewhatSmallerThanString,
      comparableToString, someWhatLargerThanString, muchLargerThanString, muchMuchLargerThanString ],

    COMPARATIVE_DESCRIPTION_RANGES: COMPARATIVE_DESCRIPTION_RANGES
  };

  ohmsLaw.register( 'OhmsLawConstants', OhmsLawConstants );

  return OhmsLawConstants;
} );