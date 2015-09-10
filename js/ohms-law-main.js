// Copyright 2002-2013, University of Colorado Boulder

/**
 * Main entry point for the "ohms law" sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var SimLauncher = require( 'JOIST/SimLauncher' ),
    Sim = require( 'JOIST/Sim' ),
    Screen = require( 'JOIST/Screen' ),
    OhmsLawModel = require( 'OHMS_LAW/ohms-law/model/OhmsLawModel' ),
    OhmsLawView = require( 'OHMS_LAW/ohms-law/view/OhmsLawView' );

  // strings
  var simTitle = require( 'string!OHMS_LAW/ohms-law.title' );

  var simOptions = {
    credits: {
      leadDesign: 'Michael Dubson',
      softwareDevelopment: 'Michael Dubson, John Blanco',
      team: 'Mindy Gratny, Ariel Paul',
      thanks: 'Thanks to Mobile Learner Labs for working with the PhET development team\nto convert this simulation to HTML5.'
    }
  };

  SimLauncher.launch( function() {
    //Create and start the sim
    new Sim( simTitle, [
      new Screen( simTitle, null /* single-screen sim, no icon */,
        function() { return new OhmsLawModel(); },
        function( model ) { return new OhmsLawView( model ); },
        { backgroundColor: '#ffffdf' }
      )
    ], simOptions ).start();
  } );
} );
