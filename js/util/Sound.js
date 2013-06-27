// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * CrossBrowser Sound container
 * Author: Vasily Shakhov (Mlearner)
 */

define(
  [],
  function() {
    'use strict';
    function Sound( name ) {
      var sound = document.createElement( 'audio' );

      if ( sound.canPlayType( 'audio/mpeg' ) ) { //mp3
        sound.setAttribute( 'src', 'sounds/' + name + '.mp3' );
      }
      else {
        sound.setAttribute( 'src', 'sounds/' + name + '.ogg' );
      }
      return sound;
    }

    return Sound;
  } );
