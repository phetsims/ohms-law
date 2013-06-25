/**
 * Copyright 2002-2013, University of Colorado
 * Main entry point for the "ohms law" sim.
 * Author: Vasily Shakhov (Mlearner)
 */

require(
  [
    'easel',
    "PHETCOMMON/view/CanvasQuirks",
    "model/OhmsLawModel",
    "view/OhmsLawView",
    "OhmsLawStrings",
    'imageLoader',
    'JOIST/SimLauncher'
  ],
  function( Easel, CanvasQuirks, OhmsLawModel, OhmsLawView, Strings, imageLoader, SimLauncher ) {
    'use strict';

    // Title --------------------------------------------------------------------
    $( 'title' ).html( Strings.simTitle );

    // Model --------------------------------------------------------------------
    var model = new OhmsLawModel();

    //prevent text cursor on dragging
    document.onselectstart = function() { return false; };

    var container = $( "#canvasContainer" ).css( 'position', 'relative' );

    SimLauncher.launch( imageLoader, function() {

      // View --------------------------------------------------------------------
      var view = new OhmsLawView( container, model );

      CanvasQuirks.fixTextCursor( view.$canvas );

      //Touch
      Easel.Touch.enable( view.$stage, false, false );
    } );
  } );
