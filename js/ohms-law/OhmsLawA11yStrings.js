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
    ohmsLawTitleString: 'Ohm\'s Law',

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
    slightlySmallerThanString: 'slightly smaller than',
    comparableToString: 'comparable to',
    slightlyLargerThanString: 'slightly larger than',
    muchLargerThanString: 'much larger than',
    muchMuchLargerThanString: 'much much larger than',

    // pattern for the description of relative letter size
    relativeSizePatternString: '<strong>Letter V</strong> is <em>{{iComparison}}</em> <strong>letter I</strong> and <em>{{rComparison}}</em> <strong>letter R</strong>.',

    //--------------------------------------------------------------------------
    // Equation strings
    //--------------------------------------------------------------------------
    ohmsLawEquationString: 'The Equation',
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
    batteriesVisiblePatternString: '<em>{{visible}}</em> {{show}} <em>{{voltage}} volts.</em>',
    showString: 'show',
    showsString: 'shows',

    //--------------------------------------------------------------------------
    // Current strings
    //--------------------------------------------------------------------------
    currentDescriptionPatternString: '<em>{{arrowSize}} arrows</em> pointing clockwise indicate a flowing current of <em>{{value}} milliamps.</em>',

    //--------------------------------------------------------------------------
    // Resistance strings
    //--------------------------------------------------------------------------
    tinyNumberOfDotsString: 'Tiny number of dots',
    verySmallNumberOfDotsString: 'Very small number of',
    smallNumberOfDotsString: 'A small number of',
    goodManyNumberOfDotsString: 'Several',
    largeNumberOfDotsString: 'Large number of',
    veryLargeNumberOfDotsString: 'Very large number of',
    hugeNumberOfDotsString: 'Huge number of',

    resistanceDotsPatternString: '<em>{{dots}} dots</em> in resistor represent resistance.',

    //--------------------------------------------------------------------------
    // Scene summary strings
    //--------------------------------------------------------------------------

    // pattern for the current arrow description in the scene summary
    summaryCurrentPatternString: '<em>{{size}}</em> arrows represent amount of current flowing clockwise through circuit.',
    summaryLookForSlidersString: 'Look for voltage and resistance sliders to play.',
    summaryShortcutHintsString: 'If you need to, check out keyboard shortcuts for this sim.',
    summarySimString: 'In this sim, the Play Area contains the Ohm\'s Law equation, V equals I times R, and a circuit. There are also sliders to play with voltage and resistance. The circuit connects a resistor to a series of batteries. Batteries show amount of voltage. Dots in the resistor indicate the level of resistance in the resistor. In the Control Panel, buttons mute sound or reset sim.',

    stateOfSimString: 'State of Sim',
    rightNowString: 'Right now,',
    withTheseValuesString: 'With these values,',

    summaryVoltagePatternString: 'Voltage, <strong>V</strong>, is <em>{{value}} volts</em>',
    resistanceSummaryPatternString: 'Resistance, <strong>R</strong>, is <em>{{value}} ohms</em>',
    currentSummaryPatternString: 'Current, <strong>I</strong>, is <em>{{value}} milliamps</em>',


    //--------------------------------------------------------------------------
    // slider strings
    //--------------------------------------------------------------------------
    sliderControlsString: 'Slider Controls',
    slidersDescriptionString: 'Voltage and resistance sliders allow changes to equation and circuit.',

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