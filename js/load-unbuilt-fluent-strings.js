// Copyright 2024, University of Colorado Boulder

/**
 * A prototype for loading unbuilt fluent strings. Meant to be a preload
 * script, pulling in the fluent strings before the simulation is loaded.
 *
 * This will need to be integrated into PhET's string modules in a more
 * robust way.
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

( () => {
  window.phet = window.phet || {};
  window.phet.chipper = window.phet.chipper || {};

  // Constructing the string map
  window.phet.chipper.fluentStrings = {};

  const requestFluentFile = () => {
    const xhr = new XMLHttpRequest();
    xhr.open( 'GET', 'ohms-law-strings_en.ftl', true );
    xhr.responseType = 'text';
    xhr.onload = () => {
      if ( xhr.status === 200 ) {
        window.phet.chipper.fluentStrings = xhr.response;
      }
    };
    xhr.send();
  };

  requestFluentFile();
} )();