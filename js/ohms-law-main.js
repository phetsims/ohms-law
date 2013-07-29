// Copyright 2002-2013, University of Colorado Boulder

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
    Strings = require( 'OhmsLawStrings' ),
    Rectangle = require( 'SCENERY/nodes/Rectangle' ),
    OhmsLawModel = require( 'model/OhmsLawModel' ),
    OhmsLawView = require( 'view/OhmsLawView' ),
    imageLoader = require( 'imageLoader' );


  SimLauncher.launch( imageLoader, function() {
    //Create and start the sim
    new Sim( Strings.simTitle, [
      {
        name: Strings.simTitle,
        icon: new Rectangle( 0, 0, 50, 50, { fill: 'blue' } ),
        createModel: function() { return new OhmsLawModel( 1000, 750 ); },
        createView: function( model ) { return new OhmsLawView( model ); },
        backgroundColor: "#ffffdf"
      }
    ] ).start();
  } );
} );
