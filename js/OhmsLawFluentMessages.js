// Copyright 2024, University of Colorado Boulder

/**
 * Prototype for preparing fluent strings for Ohm's Law. Fluent strings are loaded in a preload script. They are then
 * processed into Properties so that they can be used in the simulation.
 *
 * See Classes in Chipper that support Fluent:
 *   - https://github.com/phetsims/joist/issues/992
 *   - https://github.com/phetsims/chipper/issues/1532
 *
 * @author Jesse Greenberg (PhET Interactive Simulations)
 */

import { englishBundle } from '../../chipper/js/localizedFluentBundleProperty.js';
import FluentUtils from '../../chipper/js/FluentUtils.js';
import LocalizedMessageProperty from '../../chipper/js/LocalizedMessageProperty.js';

const OhmsLawFluentMessages = {};
for ( const [ id ] of englishBundle.messages ) {

  // So that you can look up fluent strings with camelCase.
  OhmsLawFluentMessages[ FluentUtils.fluentIdToMessageKey( id ) ] = new LocalizedMessageProperty( id );
}

export default OhmsLawFluentMessages;