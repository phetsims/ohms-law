/**
 * Copyright 2002-2013, University of Colorado
 * Stage for the "OhmsLaw" module, sets up the scene.
 * Author: Vasily Shakhov (Mlearner)
 */

define(
    [
      "i18n!../../nls/ohms-law-strings",
      'tpl!../../html/reset.html',
      'tpl!../../html/sound.html',
      'tpl!../../html/tab.html'
    ],
    function ( i18n, resetButton, soundButton, tabPanel ) {
      "use strict";

      function ControlPanel( container, model ) {

        //reset button
        var reset = $( resetButton( {} ) );
        container.append( reset );
        reset.bind( 'click', function () {
          model.reset();
        } );

        //sound buttons
        var sound = $( soundButton( {} ) );
        container.append( sound );
        var soundOn = container.find( '.sound-button > .on' );
        var soundOff = container.find( '.sound-button > .off' );
        model.sounds.active.addObserver( function ( booleanVal ) {
          soundOn[booleanVal ? 'show' : 'hide']();
          soundOff[booleanVal ? 'hide' : 'show']();
        } );
        soundOn.bind( 'click', function () {
          model.sounds.active.set( false );
        } );
        soundOff.bind( 'click', function () {
          model.sounds.active.set( true );
        } );

        //bottom panel
        $( document.body ).append( tabPanel );
        $( document.body ).find( ".tab-name" ).html( i18n.simTitle );
      }

      return ControlPanel;
    } );
