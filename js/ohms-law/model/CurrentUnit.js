// Copyright 2020, University of Colorado Boulder

/**
 * Enumeration for how what unit to display the current in.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawConstants from '../OhmsLawConstants.js';

const CurrentUnit = Enumeration.byKeys( [ 'MILLIAMPS', 'AMPS' ], {
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

ohmsLaw.register( 'CurrentUnit', CurrentUnit );
export default CurrentUnit;