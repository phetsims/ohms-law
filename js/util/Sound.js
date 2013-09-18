/**
 * Copyright 2002-2013, University of Colorado
 * CrossBrowser Sound container
 * Author: Vasily Shakhov (Mlearner)
 */

define( function( require ) {
  'use strict';
  function Sound( name ) {
    // See if there is a reference to this sound in the DOM (included with
    // data URI in base64).
    var sound = document.getElementById( 'sounds/' + name + '.mp3' );

    if ( sound === null ) {
      // Sound was not embedded in document, pull it from a relative path.
      sound = document.createElement( 'audio' );
      sound.setAttribute( 'src', 'sounds/' + name + '.mp3' );
    }

    return sound;
  }

  return Sound;
} );
