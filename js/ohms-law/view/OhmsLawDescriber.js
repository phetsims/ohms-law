// Copyright 2020-2021, University of Colorado Boulder

/**
 * Describer for the sim, responsible for formulating descriptions used throughout the sim.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ohmsLaw from '../../ohmsLaw.js';
import CurrentUnit from '../model/CurrentUnit.js';
import OhmsLawA11yStrings from '../OhmsLawA11yStrings.js';

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
   * @public
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
   * @public
   */
  getUnitForCurrent() {
    switch( this.model.currentUnitsProperty.value ) {
      case CurrentUnit.AMPS:
        return currentAmpsString;
      case CurrentUnit.MILLIAMPS:
        return currentMilliampsString;
      default:
        break;
    }
    throw new Error( 'unexpected value for currentUnitsProperty' );
  }
}

ohmsLaw.register( 'OhmsLawDescriber', OhmsLawDescriber );
export default OhmsLawDescriber;