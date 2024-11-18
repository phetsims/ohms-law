// Copyright 2020-2021, University of Colorado Boulder

/**
 * Describer for the sim, responsible for formulating descriptions used throughout the sim.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import Enumeration from '../../../../phet-core/js/Enumeration.js';
import Utils from '../../../../dot/js/Utils.js';
import OhmsLawFluentMessages, { formatMessage } from '../../OhmsLawFluentMessages.js';
import OhmsLawConstants from '../OhmsLawConstants.js';
import ohmsLaw from '../../ohmsLaw.js';

// enum for describing resistance impurities
class ResistorImpurities extends EnumerationValue {
  static TINY = new ResistorImpurities();
  static VERY_SMALL = new ResistorImpurities();
  static SMALL = new ResistorImpurities();
  static MEDIUM = new ResistorImpurities();
  static LARGE = new ResistorImpurities();
  static VERY_LARGE = new ResistorImpurities();
  static HUGE = new ResistorImpurities();
  static enumeration = new Enumeration( ResistorImpurities );
}

// enum for describing a letter in the ohms-law equation
export class EquationLetter extends EnumerationValue {
  static V = new EquationLetter();
  static I = new EquationLetter();
  static R = new EquationLetter();
  static enumeration = new Enumeration( EquationLetter );
}

// enum for describing the size change of a letter in the ohms-law equation
export class SizeChange extends EnumerationValue {
  static GROWS = new SizeChange();
  static SHRINKS = new SizeChange();
  static GROWS_A_LOT = new SizeChange();
  static SHRINKS_A_LOT = new SizeChange();
  static enumeration = new Enumeration( SizeChange );
}

class OhmsLawDescriber {

  /**
   * @param {OhmsLawModel} model
   */
  constructor( model ) {

    // @private
    this.model = model;

    // @public - Enumeration value describing the impurities in the resistor
    this.resistorImpuritiesProperty = new DerivedProperty( [ model.resistanceProperty ], resistance => {
      const values = ResistorImpurities.enumeration.values;
      const range = OhmsLawConstants.RESISTANCE_RANGE;

      // map the normalied value to one of the resistance descriptions
      const index = Utils.roundSymmetric( Utils.linear( range.min, range.max, 0, values.length - 1, resistance ) );
      return values[ index ];
    } );

    this.formattedCurrentProperty = new DerivedProperty( [ model.currentUnitsProperty ], current => {
      return model.getFixedCurrent();
    } );
  }

  /**
   * Generate an alert from strings and values that describes a change in the model. Something like
   * "As letter V grows, letter I grows. Current now 10.0 milliamps with voltage at 5.0 volts."
   * Used for a11y.
   *
   * @param  {EquationLetter} firstLetter - enum value representing the first letter of the phrase.
   * @param  {SizeChange} firstSizeChange - enum value representing the size change of the first letter
   * @param  {SizeChange} iSizeChange - enum value describing size change of letter I
   * @param  {number} currentVal - value of model current Property
   * @returns {string} string
   * @public
   */
  getValueChangeAlertString( firstLetter, firstSizeChange, iSizeChange ) {
    const currentVal = this.model.getFixedCurrent();

    return formatMessage( OhmsLawFluentMessages.sliderChangeAlertPatternMessageProperty, {
      firstLetter: firstLetter,
      firstSizeChange: firstSizeChange,
      iSizeChange: iSizeChange,
      currentVal: currentVal,
      unit: this.model.currentUnitsProperty
    } );
  }
}

ohmsLaw.register( 'OhmsLawDescriber', OhmsLawDescriber );
export default OhmsLawDescriber;