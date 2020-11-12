// Copyright 2013-2020, University of Colorado Boulder

/**
 * Main entry point for the 'ohms law' sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import OhmsLawScreen from './ohms-law/OhmsLawScreen.js';
import ohmsLawStrings from './ohmsLawStrings.js';

const ohmsLawTitleString = ohmsLawStrings[ 'ohms-law' ].title;

// constants
const tandem = Tandem.ROOT;

const simOptions = {
  credits: {
    leadDesign: 'Michael Dubson',
    softwareDevelopment: 'John Blanco, Michael Dubson, Jesse Greenberg, Michael Kauzmann, Martin Veillette',
    team: 'Mindy Gratny, Emily B. Moore, Ariel Paul, Kathy Perkins, Taliesin Smith, Brianna Tomlinson',
    qualityAssurance: 'Steele Dalton, Alex Dornan, Bryce Griebenow, Ethan Johnson, Elise Morgan, Liam Mulhall, Oliver Orejola, Benjamin Roberts, Ethan Ward, Kathryn Woessner, Bryan Yoelin',
    soundDesign: 'Ashton Morris, Mike Winters',
    thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team to convert this ' +
            'simulation to HTML5.'
  },
  hasKeyboardHelpContent: true
};

simLauncher.launch( () => {

  // Create and start the sim
  const sim = new Sim( ohmsLawTitleString, [ new OhmsLawScreen( tandem.createTandem( 'ohmsLawScreen' ) ) ], simOptions );
  sim.start();
} );