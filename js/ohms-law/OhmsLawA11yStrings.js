// Copyright 2017-2021, University of Colorado Boulder

/**
 * Single location of all accessibility strings.  These strings are not meant to be translatable yet.  Rosetta needs
 * some work to provide translators with context for these strings, and we want to receive some community feedback
 * before these strings are submitted for translation.
 *
 * @author Jesse Greenberg
 */

import ohmsLaw from '../ohmsLaw.js';

const OhmsLawA11yStrings = {
  resistanceUnitsPattern: {
    value: '{{value}} Ohms'
  },
  voltageUnitsPattern: {
    value: '{{value}} Volts'
  },
  resistanceSliderLabel: {
    value: 'R, Resistance'
  },
  voltageSliderLabel: {
    value: 'V, Voltage'
  },

  currentAmps: {
    value: 'amps'
  },
  currentMilliamps: {
    value: 'milliamps'
  },
  chooseUnitForCurrent: {
    value: 'Choose unit for current.'
  },

  //--------------------------------------------------------------------------
  // Relative size strings
  //--------------------------------------------------------------------------

  // descriptions for the size of the current arrows
  // Note: Don't change number of sizes without changing the number of sizes value
  numberOfSizes: {
    value: 6
  },
  tiny: {
    value: 'Tiny'
  },
  verySmall: {
    value: 'Very small'
  },
  small: {
    value: 'Small'
  },
  mediumSize: {
    value: 'Medium size'
  },
  large: {
    value: 'Large'
  },
  veryLarge: {
    value: 'Very large'
  },
  huge: {
    value: 'Huge'
  },

  // relative descriptions that compare size of equation variables
  muchMuchSmallerThan: {
    value: 'much much smaller than'
  },
  muchSmallerThan: {
    value: 'much smaller than'
  },
  slightlySmallerThan: {
    value: 'slightly smaller than'
  },
  comparableTo: {
    value: 'comparable to'
  },
  slightlyLargerThan: {
    value: 'slightly larger than'
  },
  muchLargerThan: {
    value: 'much larger than'
  },
  muchMuchLargerThan: {
    value: 'much much larger than'
  },

  // pattern for the description of relative letter size
  relativeSizePattern: {
    value: 'In equation, <strong>letter V</strong> is <em>{{iComparison}}</em> <strong>letter I</strong> and <em>{{rComparison}}</em> <strong>letter R</strong>.'
  },

  //--------------------------------------------------------------------------
  // Equation strings
  //--------------------------------------------------------------------------
  ohmsLawEquation: {
    value: 'Ohm\'s Law Equation'
  },
  ohmsLawDefinition: {
    value: 'Voltage, <strong>V</strong>, is equal to Current, <strong>I</strong>, times Resistance, <strong>R</strong>.'
  },

  //--------------------------------------------------------------------------
  // Circuit strings
  //--------------------------------------------------------------------------
  circuitLabel: {
    value: 'The Circuit'
  },
  circuitDescription: {
    value: 'A pair of wires connect a resistor to a series of batteries. In circuit,'
  },

  //--------------------------------------------------------------------------
  // Battery strings
  //--------------------------------------------------------------------------

  batteriesSupplyPattern: {
    value: 'batteries supply <em>{{voltage}} volts</em>'
  },

  //--------------------------------------------------------------------------
  // Current strings
  //--------------------------------------------------------------------------
  currentDescriptionPattern: {
    value: '<em>{{arrowSize}} arrows</em> indicate a current flowing clockwise at <em>{{value}} {{unit}}</em>'
  },

  //--------------------------------------------------------------------------
  // Resistance strings
  //--------------------------------------------------------------------------

  tinyAmountOfImpurities: {
    value: 'a tiny amount of impurities'
  },
  verySmallAmountOfImpurities: {
    value: 'a very small amount of impurities'
  },
  smallAmountOfImpurities: {
    value: 'a small amount of impurities'
  },
  mediumAmountOfImpurities: {
    value: 'a medium amount of impurities'
  },
  largeAmountOfImpurities: {
    value: 'a large amount of impurities'
  },
  veryLargeAmountOfImpurities: {
    value: 'a very large amount of impurities'
  },
  hugeAmountOfImpurities: {
    value: 'a huge amount of impurities'
  },

  resistanceDotsPattern: {
    value: 'resistor shows <em>{{impurities}}</em>'
  },

  //--------------------------------------------------------------------------
  // Screen summary strings
  //--------------------------------------------------------------------------

  // pattern for the current arrow description in the screen summary
  summaryLookForSliders: {
    value: 'Look for voltage and resistance sliders to play, or read on for details about equation and circuit.'
  },
  summaryPlayArea: {
    value: 'In the Play Area you find the equation for Ohm\'s Law, <strong>V</strong> equals ' +
           '<strong>I</strong> times <strong>R</strong>, and a circuit. Voltage and resistance sliders ' +
           'allow changes to the equation and circuit.'
  },
  summaryControlArea: {
    value: 'The Control Area has radio buttons to switch between milliamps and amps, and a button to reset the sim.'
  },

  stateOfSim: {
    value: 'State of Sim'
  },
  rightNow: {
    value: 'Right now,'
  },

  voltageSummaryPattern: {
    value: 'voltage, <strong>V</strong>, is <em>{{value}} volts</em>'
  },
  resistanceSummaryPattern: {
    value: 'resistance, <strong>R</strong>, is <em>{{value}} ohms</em>'
  },
  currentSummaryPattern: {
    value: 'current, <strong>I</strong>, is <em>{{value}} {{unit}}</em>'
  },


  //--------------------------------------------------------------------------
  // slider strings
  //--------------------------------------------------------------------------
  sliderControls: {
    value: 'Slider Controls'
  },
  slidersDescription: {
    value: 'Voltage and resistance sliders allow changes to equation and circuit.'
  },

  sliderChangeAlertPattern: {
    value: 'As letter {{initLetter}} {{initSizeChange}}, letter I {{iSizeChange}}.  Current now {{currentVal}} {{unit}}.'
  },
  letterR: {
    value: 'R'
  },
  letterV: {
    value: 'V'
  },
  shrinks: {
    value: 'shrinks'
  },
  grows: {
    value: 'grows'
  },
  aLot: {
    value: 'a lot'
  }
};

if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
  for ( const key in OhmsLawA11yStrings ) {
    OhmsLawA11yStrings[ key ].value += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
  }
}

// verify that object is immutable, without the runtime penalty in production code
if ( assert ) { Object.freeze( OhmsLawA11yStrings ); }

ohmsLaw.register( 'OhmsLawA11yStrings', OhmsLawA11yStrings );

export default OhmsLawA11yStrings;