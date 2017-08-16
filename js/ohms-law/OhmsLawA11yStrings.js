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
    voltageSliderLabelString: 'Voltage'
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