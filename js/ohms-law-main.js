// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main entry point for the 'ohms law' sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var SliderAndGeneralKeyboardHelpContent = require( 'SCENERY_PHET/keyboard/help/SliderAndGeneralKeyboardHelpContent' );
  var OhmsLawScreen = require( 'OHMS_LAW/ohms-law/OhmsLawScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var ohmsLawTitleString = require( 'string!OHMS_LAW/ohms-law.title' );

  // constants
  var tandem = Tandem.rootTandem;

  // a11y - help content to describe keyboard interactions
  var keyboardHelpContent = new SliderAndGeneralKeyboardHelpContent();

  var simOptions = {
    credits: {
      leadDesign: 'Michael Dubson',
      softwareDevelopment: 'Michael Dubson, John Blanco',
      team: 'Mindy Gratny, Ariel Paul',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Oliver Orejola, Benjamin Roberts, Bryan Yoelin',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this ' +
              'simulation to HTML5.'
    },
    accessibility: true,
    keyboardHelpNode: keyboardHelpContent,
    supportsSound: true
  };

  SimLauncher.launch( function() {

    // Create and start the sim
    var sim = new Sim( ohmsLawTitleString, [ new OhmsLawScreen( tandem.createTandem( 'ohmsLawScreen' ) ) ], simOptions );
    sim.start();
  } );

} );
