// Copyright 2017-2021, University of Colorado Boulder

/**
 * Constants used in multiple locations within the 'Ohms Law' simulation.
 *
 * @author Martin Veillette (Berea College)
 */

import Range from '../../../dot/js/Range.js';
import RangeWithValue from '../../../dot/js/RangeWithValue.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import ohmsLaw from '../ohmsLaw.js';
import OhmsLawA11yStrings from './OhmsLawA11yStrings.js';

const tinyString = OhmsLawA11yStrings.tiny.value;
const verySmallString = OhmsLawA11yStrings.verySmall.value;
const smallString = OhmsLawA11yStrings.small.value;
const mediumSizeString = OhmsLawA11yStrings.mediumSize.value;
const largeString = OhmsLawA11yStrings.large.value;
const veryLargeString = OhmsLawA11yStrings.veryLarge.value;
const hugeString = OhmsLawA11yStrings.huge.value;
const muchMuchSmallerThanString = OhmsLawA11yStrings.muchMuchSmallerThan.value;
const muchSmallerThanString = OhmsLawA11yStrings.muchSmallerThan.value;
const slightlySmallerThanString = OhmsLawA11yStrings.slightlySmallerThan.value;
const comparableToString = OhmsLawA11yStrings.comparableTo.value;
const slightlyLargerThanString = OhmsLawA11yStrings.slightlyLargerThan.value;
const muchLargerThanString = OhmsLawA11yStrings.muchLargerThan.value;
const muchMuchLargerThanString = OhmsLawA11yStrings.muchMuchLargerThan.value;

// constants used by other constants
const RESISTANCE_RANGE = new RangeWithValue( 10, 1000, 500 ); // in ohms
const VOLTAGE_RANGE = new RangeWithValue( 0.1, 9, 4.5 ); // in volts

const WIRE_WIDTH = 505;
const BATTERIES_OFFSET = 30;
const AA_VOLTAGE = 1.5; // in volts
const MAX_NUMBER_OF_BATTERIES = Math.ceil( VOLTAGE_RANGE.max / AA_VOLTAGE );

// map for relative size of variables to their accessible description - ranges values are the ratio of sizes
// for instance, a value 0.25 means that the letter is 1/4 the size of the other
const COMPARATIVE_DESCRIPTION_RANGES = {
  MUCH_MUCH_SMALLER: {
    range: new Range( 0, 0.25 ),
    description: muchMuchSmallerThanString
  },
  MUCH_SMALLER: {
    range: new Range( 0.25, 0.50 ),
    description: muchSmallerThanString
  },
  SLIGHTLY_SMALLER: {
    range: new Range( 0.50, 0.9 ),
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
  MUCH_MUCH_LARGER: {
    range: new Range( 4.0, Number.MAX_VALUE ),
    description: muchMuchLargerThanString
  }
};

const OhmsLawConstants = {

  // colors
  BLUE_COLOR: '#0f0ffb',
  BLACK_COLOR: '#000',

  // range for sliders with default values
  RESISTANCE_RANGE: RESISTANCE_RANGE,
  VOLTAGE_RANGE: VOLTAGE_RANGE,

  // range of current values that can occur
  CURRENT_RANGE: new Range( VOLTAGE_RANGE.min / RESISTANCE_RANGE.max, VOLTAGE_RANGE.max / RESISTANCE_RANGE.min ),

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
  UNIT_MAX_WIDTH: 45, // i18n

  // precision for each of the physical quantities in this sim
  VOLTAGE_SIG_FIGS: 1,
  RESISTANCE_SIG_FIGS: 0,
  CURRENT_MILLIAMPS_SIG_FIGS: 1,
  CURRENT_AMPS_SIG_FIGS: 3,

  // wire circuit
  WIRE_WIDTH: WIRE_WIDTH,
  WIRE_HEIGHT: 165,

  // battery
  MAX_NUMBER_OF_BATTERIES: MAX_NUMBER_OF_BATTERIES,
  BATTERIES_OFFSET: BATTERIES_OFFSET,
  BATTERY_HEIGHT: 38,
  AA_VOLTAGE: AA_VOLTAGE,
  BATTERY_WIDTH: ( WIRE_WIDTH - BATTERIES_OFFSET * 2 ) / MAX_NUMBER_OF_BATTERIES,

  RELATIVE_SIZE_STRINGS: [ tinyString, verySmallString, smallString, mediumSizeString,
    largeString, veryLargeString, hugeString ],

  COMPARISON_SIZE_STRINGS: [ muchMuchSmallerThanString, muchSmallerThanString, slightlySmallerThanString,
    comparableToString, slightlyLargerThanString, muchLargerThanString, muchMuchLargerThanString ],

  COMPARATIVE_DESCRIPTION_RANGES: COMPARATIVE_DESCRIPTION_RANGES
};

ohmsLaw.register( 'OhmsLawConstants', OhmsLawConstants );

export default OhmsLawConstants;