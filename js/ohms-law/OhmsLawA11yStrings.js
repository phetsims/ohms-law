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
    // Note: Don't change number of sizes without changing the number of sizes value
    numberOfSizes: 6,
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
    relativeSizePatternString: 'In equation, <strong>letter V</strong> is <em>{{iComparison}}</em> <strong>letter I</strong> and <em>{{rComparison}}</em> <strong>letter R</strong>.',

    //--------------------------------------------------------------------------
    // Equation strings
    //--------------------------------------------------------------------------
    ohmsLawEquationString: 'Ohm\'s Law Equation',
    ohmsLawDefinitionString: 'Voltage, <strong>V</strong>, is equal to Current, <strong>I</strong>, times Resistance, <strong>R</strong>.',

    //--------------------------------------------------------------------------
    // Circuit strings
    //--------------------------------------------------------------------------
    circuitLabelString: 'The Circuit',
    circuitDescriptionString: 'A pair of wires connect a resistor to a series of batteries. In circuit, ',

    //--------------------------------------------------------------------------
    // Battery strings
    //--------------------------------------------------------------------------

    batteriesSupplyPatternString: 'batteries supply <em>{{voltage}} volts</em>',

    //--------------------------------------------------------------------------
    // Current strings
    //--------------------------------------------------------------------------
    currentDescriptionPatternString: '<em>{{arrowSize}} arrows</em> indicate a current flowing clockwise at <em>{{value}} milliamps</em>',

    //--------------------------------------------------------------------------
    // Resistance strings
    //--------------------------------------------------------------------------

    tinyAmountOfImpuritiesString: 'a tiny amount of impurities',
    verySmallAmountOfImpuritiesString: 'a very small amount of impurities',
    smallAmountOfImpuritiesString: 'a small amount of impurities',
    mediumAmountOfImpuritiesString: 'a medium amount of impurities',
    largeAmountOfImpuritiesString: 'a large amount of impurities',
    veryLargeAmountOfImpuritiesString: 'a very large amount of impurities',
    hugeAmountOfImpuritiesString: 'a huge amount of impurities',

    resistanceDotsPatternString: 'resistor shows <em>{{impurities}}</em>',

    //--------------------------------------------------------------------------
    // Scene summary strings
    //--------------------------------------------------------------------------

    // pattern for the current arrow description in the scene summary
    summaryCurrentPatternString: '<em>{{size}}</em> arrows indicate amount of current flowing clockwise at {{current}} milliamps.',
    summaryLookForSlidersString: 'Look for voltage and resistance sliders to play, or read on for details about equation and circuit.',
    summaryShortcutHintsString: 'If you need to, check out keyboard shortcuts for this sim.',
    summarySimString: 'This is an interactive sim. Descriptions change as you play with it. It has a Play Area and ' +
                      'Control Panel. In the Play Area you find the equation for Ohm\'s Law, <strong>V</strong> equals ' + 
                      '<strong>I</strong> times <strong>R</strong>, and a ' + 'circuit. Voltage and resistance sliders ' +
                      'allow changes to the equaltion and circuit. In the Control Panel, buttons mute sound or reset the sim.',

    stateOfSimString: 'State of Sim',
    rightNowString: 'Right now,',

    voltageSummaryPatternString: 'voltage, <strong>V</strong>, is <em>{{value}} volts</em>',
    resistanceSummaryPatternString: 'resistance, <strong>R</strong>, is <em>{{value}} ohms</em>',
    currentSummaryPatternString: 'current, <strong>I</strong>, is <em>{{value}} milliamps</em>',


    //--------------------------------------------------------------------------
    // slider strings
    //--------------------------------------------------------------------------
    sliderControlsString: 'Slider Controls',
    slidersDescriptionString: 'Voltage and resistance sliders allow changes to equation and circuit.',

    sliderChangeAlertPatternString: 'As letter {{initLetter}} {{initSizeChange}}, letter I {{iSizeChange}}.  Current now {{currentVal}} milliamps.',
    letterRString: 'R',
    letterVString: 'V',
    shrinksString: 'shrinks',
    growsString: 'grows',
    aLotString: 'a lot'
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