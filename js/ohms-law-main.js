/**
 * Copyright 2002-2013, University of Colorado
 * Main entry point for the "ohms law" sim.
 * Author: Vasily Shakhov (Mlearner)
 */

require(
  [
    "PHETCOMMON/view/CanvasQuirks",
    "model/OhmsLawModel",
    "view/OhmsLawStage",
    "i18n!../nls/ohms-law-strings"
  ],
  function ( CanvasQuirks, OhmsLawModel, OhmsLawStage, Strings ) {

    // Title --------------------------------------------------------------------
    console.log(Strings)
    $( 'title' ).html( Strings.title );

    // Model --------------------------------------------------------------------
    var model = new OhmsLawModel();

    // View --------------------------------------------------------------------
    var canvas = document.getElementById( 'canvas' );
    CanvasQuirks.fixTextCursor( canvas );
    var stage = new OhmsLawStage( canvas, model );

    //Touch
    createjs.Touch.enable( stage, false, false );
  } );
