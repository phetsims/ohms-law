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
  var Screen = require( 'JOIST/Screen' );
  var OhmsLawModel = require( 'OHMS_LAW/ohms-law/model/OhmsLawModel' );
  var OhmsLawScreenView = require( 'OHMS_LAW/ohms-law/view/OhmsLawScreenView' );
  var Property = require( 'AXON/Property' );
  var Color = require( 'SCENERY/util/Color' );

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

  SimLauncher.launch( function() {
    //Create and start the sim
    new Sim( ohmsLawTitleString, [
      new Screen(
        function() { return new OhmsLawModel(); },
        function( model ) { return new OhmsLawScreenView( model ); },
        { backgroundColorProperty: new Property( Color.toColor( '#ffffdf' ) ) }
      )
    ], simOptions ).start();
  } );
} );
