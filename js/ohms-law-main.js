// Copyright 2013-2020, University of Colorado Boulder

/**
 * Main entry point for the 'ohms law' sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import SliderAndGeneralKeyboardHelpContent
  from '../../scenery-phet/js/keyboard/help/SliderAndGeneralKeyboardHelpContent.js';
import Tandem from '../../tandem/js/Tandem.js';
import ohmsLawStrings from './ohms-law-strings.js';
import OhmsLawScreen from './ohms-law/OhmsLawScreen.js';

const ohmsLawTitleString = ohmsLawStrings[ 'ohms-law' ].title;

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
  keyboardHelpNode: keyboardHelpContent
};

SimLauncher.launch( function() {

  // Create and start the sim
  const sim = new Sim( ohmsLawTitleString, [ new OhmsLawScreen( tandem.createTandem( 'ohmsLawScreen' ) ) ], simOptions );
  sim.start();
} );