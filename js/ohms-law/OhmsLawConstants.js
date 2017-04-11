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

  var OhmsLawConstants = {

    // constants
    AA_VOLTAGE: 1.5,

    // colors
    BLUE_COLOR: '#0f0ffb',
    BLACK_COLOR: '#000',

    // range for sliders with default values
    RESISTANCE_RANGE: new RangeWithValue( 10, 1000, 500 ), // in ohms
    VOLTAGE_RANGE: new RangeWithValue( 0.1, 9, 4.5 ) // in volts
  };

  ohmsLaw.register( 'OhmsLawConstants', OhmsLawConstants );

  return OhmsLawConstants;
} );