// Copyright 2020, University of Colorado Boulder

/**
 * Enumeration for how what unit to display the current in.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const Enumeration = require( 'PHET_CORE/Enumeration' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );

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

  return ohmsLaw.register( 'CurrentUnit', CurrentUnit );
} );