// Copyright 2018-2019, University of Colorado Boulder

/**
 * Describer for the sim, responsible for formulating descriptions used throughout the sim.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( require => {
  'use strict';

  // modules
  const CurrentUnit = require( 'OHMS_LAW/ohms-law/model/CurrentUnit' );
  const ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  const OhmsLawA11yStrings = require( 'OHMS_LAW/ohms-law/OhmsLawA11yStrings' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // a11y strings
  const currentMilliampsString = OhmsLawA11yStrings.currentMilliamps.value;
  const currentAmpsString = OhmsLawA11yStrings.currentAmps.value;
  const sliderChangeAlertPatternString = OhmsLawA11yStrings.sliderChangeAlertPattern.value;

  class OhmsLawDescriber {

    /**
     * @param {OhmsLawModel} model
     */
    constructor( model ) {

      // @private
      this.model = model;
    }

    /**
     * Generate an alert from strings and values that describes a change in the model. Something like
     * "As letter V grows, letter I grows. Current now 10.0 milliamps with voltage at 5.0 volts."
     * Used for a11y.
     *
     * @param  {string} initLetter - letter representing the model property that was changed
     * @param  {string} initSizeChange - string describing change in size of letter representing changed model Property
     * @param  {string} iSizeChange - string describing size change of letter I
     * @param  {number} currentVal - value of model current Property
     * @returns {string} string
     */
    getValueChangeAlertString( initLetter, initSizeChange, iSizeChange ) {
      const currentVal = this.model.getFixedCurrent();
      return StringUtils.fillIn( sliderChangeAlertPatternString, {
        initLetter: initLetter,
        initSizeChange: initSizeChange,
        iSizeChange: iSizeChange,
        currentVal: currentVal,
        unit: this.getUnitForCurrent()
      } );
    }


    /**
     * Get the current current unit
     * @returns {string}
     */
    getUnitForCurrent() {
      switch( this.model.currentUnitsProperty.value ) {
        case CurrentUnit.AMPS:
          return currentAmpsString;
        case CurrentUnit.MILLIAMPS:
          return currentMilliampsString;
        default:
          assert && assert( false, 'unexpected value for currentUnitsProperty' );
      }
    }
  }

  return ohmsLaw.register( 'OhmsLawDescriber', OhmsLawDescriber );
} );