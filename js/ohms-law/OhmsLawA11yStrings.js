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
    resistanceSliderLabelString: 'Resistance',
    voltageSliderLabelString: 'Voltage',

    // accessible title for Ohms Law
    ohmsLawTitleString: 'Ohms Law',

    //--------------------------------------------------------------------------
    // Relative size strings
    //--------------------------------------------------------------------------

    // descriptions for the size of the current arrows
    tinyString: 'tiny',
    verySmallString: 'very small',
    smallString: 'small',
    mediumSizeString: 'medium size',
    largeString: 'large',
    veryLargeString: 'very large',
    hugeString: 'huge',

    // relative descriptions that compare size of equation variables
    muchMuchSmallerThanString: 'much much smaller than',
    muchSmallerThanString: 'much smaller than',
    somewhatSmallerThanString: 'somewhat smaller than',
    comparableToString: 'comparable to',
    someWhatLargerThanString: 'somewhat larger than',
    muchLargerThanString: 'much larger than',
    muchMuchLargerThanString: 'much much larger than',

    // pattern for the description of relative letter size
    relativeSizePatternString: '<strong>Letter V</strong> is <em>{{iComparison}}</em> <strong>letter I</strong> and <em>{{rComparison}}</em> <strong>letter R</strong>',

    //--------------------------------------------------------------------------
    // Scene summary strings
    //--------------------------------------------------------------------------

    // pattern for the current arrow description in the scene summary
    summaryCurrentPatternString: '<em>{{size}}</em> arrows represent amount of current flowing clockwise through circuit.',

    summaryLookForSlidersString: 'Look for voltage and resistance sliders to play.',
    summaryShortcutHintsString: 'If you need to, check out keyboard shortcuts for this sim.'

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