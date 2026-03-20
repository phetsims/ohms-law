// Copyright 2020-2026, University of Colorado Boulder

/**
 * Enumeration for how what unit to display the current in.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import OhmsLawConstants from '../OhmsLawConstants.js';

const CurrentUnit = EnumerationDeprecated.byKeys( [ 'MILLIAMPS', 'AMPS' ], {
  beforeFreeze: currentUnit => {

    /**
     * Get the sig figs for the appropriate unit
     * @param {CurrentUnit} enumValue
     * @returns {number}
     */
    currentUnit.getSigFigs = enumValue => {
      return enumValue === currentUnit.MILLIAMPS ? OhmsLawConstants.CURRENT_MILLIAMPS_SIG_FIGS : OhmsLawConstants.CURRENT_AMPS_SIG_FIGS;
    };
  }
} );

export default CurrentUnit;
