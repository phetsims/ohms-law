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
    'PHETCOMMON/util/ImagesLoader',
    'imageLoader'
  ],
  function( Easel, CanvasQuirks, OhmsLawModel, OhmsLawView, Strings, ImagesLoader, imageLoader ) {
    'use strict';

    // Title --------------------------------------------------------------------
    $( 'title' ).html( Strings.simTitle );

    // Model --------------------------------------------------------------------
    var model = new OhmsLawModel();

    //prevent text cursor on dragging
    document.onselectstart = function() { return false; };

    var container = $( "#canvasContainer" ).css( 'position', 'relative' );

    /* jshint -W031 */ // Disable warning about using constructor for side effects
    new ImagesLoader( function( loader ) {

      //Initialize the image loader
      imageLoader.getImage = loader.getImage;

      // View --------------------------------------------------------------------
      var view = new OhmsLawView( container, model );

      CanvasQuirks.fixTextCursor( view.$canvas );

      //Touch
      Easel.Touch.enable( view.$stage, false, false );
    } );
  } );
