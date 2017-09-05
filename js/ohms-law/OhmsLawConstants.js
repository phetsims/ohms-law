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
  var OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  var Range = require( 'DOT/Range' );

  // a11y strings
  var tinyString = OhmsLawA11yStrings.tinyString;
  var verySmallString = OhmsLawA11yStrings.verySmallString;
  var smallString = OhmsLawA11yStrings.smallString;
  var mediumSizeString = OhmsLawA11yStrings.mediumSizeString;
  var largeString = OhmsLawA11yStrings.largeString;
  var veryLargeString = OhmsLawA11yStrings.veryLargeString;
  var hugeString = OhmsLawA11yStrings.hugeString;
  var muchMuchSmallerThanString = OhmsLawA11yStrings.muchMuchSmallerThanString;
  var muchSmallerThanString = OhmsLawA11yStrings.muchSmallerThanString;
  var slightlySmallerThanString = OhmsLawA11yStrings.slightlySmallerThanString;
  var comparableToString = OhmsLawA11yStrings.comparableToString;
  var slightlyLargerThanString = OhmsLawA11yStrings.slightlyLargerThanString;
  var muchLargerThanString = OhmsLawA11yStrings.muchLargerThanString;
  var muchMuchLargerThanString = OhmsLawA11yStrings.muchMuchLargerThanString;

  // constants used by other constants
  var RESISTANCE_RANGE = new RangeWithValue( 10, 1000, 500 ); // in ohms
  var VOLTAGE_RANGE = new RangeWithValue( 0.1, 9, 4.5 ); // in volts

  var WIRE_WIDTH = 505;
  var BATTERIES_OFFSET = 30;
  var AA_VOLTAGE = 1.5; // in volts
  var MAX_NUMBER_OF_BATTERIES = Math.ceil( VOLTAGE_RANGE.max / AA_VOLTAGE );

  // map for relative size of variables to their accessible description - ranges values are the ratio of sizes
  // for instance, a value 0.25 means that the letter is 1/4 the size of the other
  var COMPARATIVE_DESCRIPTION_RANGES = {
    MUCH_MUCH_SMALLER: {
      range: new Range( 0, 0.25 ),
      description: muchMuchSmallerThanString
    },
    MUCH_SMALLER: {
      range: new Range( 0.25, 0.50 ), 
      description: muchSmallerThanString
    },
    SLIGHTLY_SMALLER: {
      range: new Range( 0.50, 0.9),
      description: slightlySmallerThanString
    },
    COMPARABLE: {
      range: new Range( 0.9, 1.10 ),
      description: comparableToString
    },
    SLIGHTLY_LARGER: {
      range: new Range( 1.10, 2.0 ),
      description: slightlyLargerThanString
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

    COMPARISON_SIZE_STRINGS: [ muchMuchSmallerThanString, muchSmallerThanString, slightlySmallerThanString,
      comparableToString, slightlyLargerThanString, muchLargerThanString, muchMuchLargerThanString ],

    COMPARATIVE_DESCRIPTION_RANGES: COMPARATIVE_DESCRIPTION_RANGES
  };

  ohmsLaw.register( 'OhmsLawConstants', OhmsLawConstants );

  return OhmsLawConstants;
} );