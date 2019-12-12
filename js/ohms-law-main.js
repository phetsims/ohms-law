// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main entry point for the 'ohms law' sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( require => {
  'use strict';

  // modules
  const SliderAndGeneralKeyboardHelpContent = require( 'SCENERY_PHET/keyboard/help/SliderAndGeneralKeyboardHelpContent' );
  const OhmsLawScreen = require( 'OHMS_LAW/ohms-law/OhmsLawScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const ohmsLawTitleString = require( 'string!OHMS_LAW/ohms-law.title' );

  // constants
  const tandem = Tandem.ROOT;

  // a11y - help content to describe keyboard interactions
  const keyboardHelpContent = new SliderAndGeneralKeyboardHelpContent();

  const simOptions = {
    credits: {
      leadDesign: 'Michael Dubson',
      softwareDevelopment: 'Michael Dubson, John Blanco, Michael Kauzmann, Martin Veillette',
      team: 'Mindy Gratny, Emily B. Moore, Ariel Paul, Kathy Perkins, Taliesin Smith, Brianna Tomlinson',
      qualityAssurance: 'Steele Dalton, Alex Dornan, Bryce Griebenow, Ethan Johnson, Elise Morgan, Liam Mulhall, Oliver Orejola, Benjamin Roberts, Ethan Ward, Kathryn Woessner, Bryan Yoelin',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this ' +
              'simulation to HTML5.'
    },
    accessibility: true,
    keyboardHelpNode: keyboardHelpContent
  };

  SimLauncher.launch( function() {

    // Create and start the sim
    const sim = new Sim( ohmsLawTitleString, [ new OhmsLawScreen( tandem.createTandem( 'ohmsLawScreen' ) ) ], simOptions );
    sim.start();
  } );

} );
