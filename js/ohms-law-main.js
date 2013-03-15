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
      "i18n!../nls/ohms-law-strings"
    ],
    function (Easel, CanvasQuirks, OhmsLawModel, OhmsLawView, Strings ) {
      'use strict';

      // Title --------------------------------------------------------------------
      $( 'title' ).html( Strings.simTitle );

      // Model --------------------------------------------------------------------
      var model = new OhmsLawModel();

      var container = $( "#canvasContainer" ).css( 'position', 'relative' );
      // View --------------------------------------------------------------------
      var view = new OhmsLawView( container, model );

      CanvasQuirks.fixTextCursor( view.$canvas );

      //Touch
      Easel.Touch.enable( view.$stage, false, false );
    } );
