// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main entry point for the 'ohms law' sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var Sim = require( 'JOIST/Sim' );
  var OhmsLawScreen = require( 'OHMS_LAW/ohms-law/OhmsLawScreen' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var ohmsLawTitleString = require( 'string!OHMS_LAW/ohms-law.title' );

  var simOptions = {
    credits: {
      leadDesign: 'Michael Dubson',
      softwareDevelopment: 'Michael Dubson, John Blanco',
      team: 'Mindy Gratny, Ariel Paul',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team\nto convert this simulation to HTML5.'
    }
  };

  // constants
  var tandem = Tandem.createRootTandem();

  SimLauncher.launch( function() {

    // Create and start the sim
    var sim = new Sim( ohmsLawTitleString, [ new OhmsLawScreen( tandem.createTandem( 'ohmsLawScreen' ) ) ], simOptions );
    sim.start();
  } );

} );
