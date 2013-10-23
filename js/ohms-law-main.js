/**
 * Copyright 2002-2013, University of Colorado
 * Main entry point for the "ohms law" sim.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';
  // imports
  var SimLauncher = require( 'JOIST/SimLauncher' ),
    Sim = require( 'JOIST/Sim' ),
    Screen = require( 'JOIST/Screen' ),
    simTitle = require( 'string!OHMS_LAW/simTitle' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    OhmsLawModel = require( 'model/OhmsLawModel' ),
    OhmsLawView = require( 'view/OhmsLawView' );

  var simOptions = {
    credits: 'PhET Development Team -\n' +
             'Lead Design: Michael Dubson\n' +
             'Software Development: Michael Dubson, John Blanco\n' +
             'Design Team: Ariel Paul\n' +
             'Interviews: Mindy Gratny\n',
    thanks: 'Thanks -\n' +
            'Thanks to Mobile Learner Labs for working with the PhET development team to convert this simulation to HTML5.'
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
