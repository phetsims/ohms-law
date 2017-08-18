// Copyright 2017, University of Colorado Boulder

/**
 * Single location of all accessibility strings.  These strings are not meant to be translatable yet.  Rosetta needs
 * some work to provide translators with context for these strings, and we want to receive some community feedback
 * before these strings are submitted for translation.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );

  var OhmsLawA11yStrings = {
    resistanceUnitsPatternString: '{{value}} Ohms',
    voltageUnitsPatternString: '{{value}} Volts',
    resistanceSliderLabelString: 'R, Resistance',
    voltageSliderLabelString: 'V, Voltage',

    // accessible title for Ohms Law
    ohmsLawTitleString: 'Ohms Law',

    //--------------------------------------------------------------------------
    // Relative size strings
    //--------------------------------------------------------------------------

    // descriptions for the size of the current arrows
    tinyString: 'Tiny',
    verySmallString: 'Very small',
    smallString: 'Small',
    mediumSizeString: 'Medium size',
    largeString: 'Large',
    veryLargeString: 'Very large',
    hugeString: 'Huge',

    // relative descriptions that compare size of equation variables
    muchMuchSmallerThanString: 'much much smaller than',
    muchSmallerThanString: 'much smaller than',
    somewhatSmallerThanString: 'somewhat smaller than',
    comparableToString: 'comparable to',
    someWhatLargerThanString: 'somewhat larger than',
    muchLargerThanString: 'much larger than',
    muchMuchLargerThanString: 'much much larger than',

    // pattern for the description of relative letter size
    relativeSizePatternString: '<strong>Letter V</strong> is <em>{{iComparison}}</em> <strong>letter I</strong> and <em>{{rComparison}}</em> <strong>letter R</strong>.',

    //--------------------------------------------------------------------------
    // Equation strings
    //--------------------------------------------------------------------------
    ohmsLawEquationString: 'Ohm\'s Law Equation',
    ohmsLawDefinitionString: 'Voltage, <strong>V</strong>, is equal to Current, <strong>I</strong>, times Resistance, <strong>R</strong>.',

    //--------------------------------------------------------------------------
    // Circuit strings
    //--------------------------------------------------------------------------
    circuitLabelString: 'The Circuit',
    circuitDescriptionString: 'Connects a resistor to a series of batteries with a pair of wires.',

    //--------------------------------------------------------------------------
    // Battery strings
    //--------------------------------------------------------------------------
    lessThanOneBatteryString: 'Less than 1 battery',
    exactlyBatteryString: 'Exactly 1 battery',
    exactlyBatteriesPatternString: 'Exactly {{number}} batteries',
    betweenBatteriesPatternString: 'Between {{min}} and {{max}} batteries',
    batteriesVisiblePatternString: '{{visible}} {{show}} {{voltage}} volts.',
    showString: 'show',
    showsString: 'shows',

    //--------------------------------------------------------------------------
    // Current strings
    //--------------------------------------------------------------------------
    currentDescriptionPatternString: '{{arrowSize}} arrows pointing clockwise represent a current of {{value}} milliamps.',

    //--------------------------------------------------------------------------
    // Resistance strings
    //--------------------------------------------------------------------------
    tinyNumberOfDotsString: 'Tiny number of dots',
    verySmallNumberOfDotsString: 'Very small number of',
    smallNumberOfDotsString: 'A small number of',
    goodManyNumberOfDotsString: 'A good many',
    largeNumberOfDotsString: 'Large number of',
    veryLargeNumberOfDotsString: 'Very large numbr of',
    hugeNumberOfDotsString: 'Huge number of',

    resistanceDotsPatternString: '{{dots}} dots in resistor represent resistance.',

    //--------------------------------------------------------------------------
    // Scene summary strings
    //--------------------------------------------------------------------------

    // pattern for the current arrow description in the scene summary
    summaryCurrentPatternString: '<em>{{size}}</em> arrows represent amount of current flowing clockwise through circuit.',

    summaryLookForSlidersString: 'Look for voltage and resistance sliders to play.',
    summaryShortcutHintsString: 'If you need to, check out keyboard shortcuts for this sim.',

    //--------------------------------------------------------------------------
    // slider strings
    //--------------------------------------------------------------------------
    sliderControlsString: 'Slider Controls',
    slidersDescriptionString: 'Change sliders to explore changes in equation and circuit',

    sliderChangeAlertPatternString: 'As letter {{initLetter}} {{initSizeChange}}, letter I {{iSizeChange}}.  Current now {{currentVal}} milliamps with {{initProperty}} at {{initVal}} {{initUnits}}.',
    letterRString: 'R',
    letterIString: 'I',
    letterVString: 'V',
    shrinksString: 'shrinks',
    growsString: 'grows',
    resistanceString: 'resistance',
    voltageString: 'voltage',
    voltsString: 'volts',
    milliampsString: 'milliamps',
    ohmsString: 'ohms'
  };

  if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
    for ( var key in OhmsLawA11yStrings ) {
      OhmsLawA11yStrings[ key ] += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
    }
  }

  // verify that object is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( OhmsLawA11yStrings ); }

  ohmsLaw.register( 'OhmsLawA11yStrings', OhmsLawA11yStrings );

  return OhmsLawA11yStrings;
} );