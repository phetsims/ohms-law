// Copyright 2013-2022, University of Colorado Boulder

/**
 * Primary model for the Ohm's Law simulation, see doc/model.md for more information.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import EnumerationDeprecatedProperty from '../../../../axon/js/EnumerationDeprecatedProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import ohmsLaw from '../../ohmsLaw.js';
import OhmsLawConstants from '../OhmsLawConstants.js';
import CurrentUnit from './CurrentUnit.js';

class OhmsLawModel {
  /**
   */
  constructor( tandem ) {

    // @public {Property.<number>} in volts
    this.voltageProperty = new NumberProperty( OhmsLawConstants.VOLTAGE_RANGE.getDefaultValue(), {
      tandem: tandem.createTandem( 'voltageProperty' ),
      units: 'V',
      range: OhmsLawConstants.VOLTAGE_RANGE,
      phetioDocumentation: 'The voltage in the circuit'
    } );

    // @public {Property.<number>} in Ohms
    this.resistanceProperty = new NumberProperty( OhmsLawConstants.RESISTANCE_RANGE.getDefaultValue(), {
      tandem: tandem.createTandem( 'resistanceProperty' ),
      units: '\u2126', // ohms
      range: OhmsLawConstants.RESISTANCE_RANGE,
      phetioDocumentation: 'The resistance in the circuit'
    } );

    // @public {Property.<number>} create a derived property that tracks the current in milli amps
    this.currentProperty = new DerivedProperty(
      [ this.voltageProperty, this.resistanceProperty ],
      computeCurrent, {
        tandem: tandem.createTandem( 'currentProperty' ),
        units: 'mA',
        phetioValueType: NumberIO,
        phetioDocumentation: 'The current flowing in the circuit'
      }
    );

    // @public
    this.currentUnitsProperty = new EnumerationDeprecatedProperty( CurrentUnit, CurrentUnit.MILLIAMPS, {
      tandem: tandem.createTandem( 'currentUnitsProperty' ),
      phetioDocumentation: 'Determines the displayed unit for the current'
    } );

    // @public (read-only) {BooleanProperty} - true when a reset is in progress, false otherwise
    this.resetInProgressProperty = new BooleanProperty( false );
  }


  /**
   * resets the properties of the model
   * @public
   */
  reset() {
    this.resetInProgressProperty.set( true );
    this.voltageProperty.reset();
    this.resistanceProperty.reset();
    this.resetInProgressProperty.set( false );
  }

  /**
   * Get the normalized voltage over the range of allowed voltages in this sim.
   * @public
   * @returns {number}
   */
  getNormalizedVoltage() {
    const range = OhmsLawConstants.VOLTAGE_RANGE;
    return ( this.voltageProperty.get() - range.min ) / range.getLength();
  }

  /**
   * Get the normalized current, based on the allowable values for current in this sim.
   * @public
   * @returns {number}
   */
  getNormalizedCurrent() {
    const range = OhmsLawModel.getCurrentRange();
    return ( this.currentProperty.get() - range.min ) / range.getLength();
  }

  /**
   * Get the normalized resistance, based on the allowable values for resistance in this
   * sim.
   * @public
   * @returns {number}
   */
  getNormalizedResistance() {
    const range = OhmsLawConstants.RESISTANCE_RANGE;
    return ( this.resistanceProperty.get() - range.min ) / range.getLength();
  }

  /**
   * Get the current as a number formatted based on the appropriate decimal places for the display unit.
   * @public
   * @returns {string}
   */
  getFixedCurrent() {
    let current = this.currentProperty.value;
    const units = this.currentUnitsProperty.value;
    if ( units === CurrentUnit.AMPS ) {
      current = current / 100;
    }
    return Utils.toFixed( current, CurrentUnit.getSigFigs( units ) );
  }

  /**
   * Get the maximum current that can be computed by the model
   * @returns {number} - the max current.
   * @public
   */
  static getMaxCurrent() {
    return computeCurrent( OhmsLawConstants.VOLTAGE_RANGE.max, OhmsLawConstants.RESISTANCE_RANGE.min );
  }

  /**
   * Get the minimum current that can be computed by the model.
   * @returns {number} [description]
   * @private
   */
  static getMinCurrent() {
    return computeCurrent( OhmsLawConstants.VOLTAGE_RANGE.min, OhmsLawConstants.RESISTANCE_RANGE.max );
  }

  /**
   * Get the Range of the current, will construct a new range if not yet set
   * @returns {Range}
   * @public
   */
  static getCurrentRange() {

    if ( !this.currentRange ) {

      // @private, use the getter
      this.currentRange = new Range( OhmsLawModel.getMinCurrent(), OhmsLawModel.getMaxCurrent() );
    }
    return this.currentRange;
  }
}

/**
 * The main model function, used to compute the current of the model
 * @param voltage
 * @param resistance
 * @returns {number} - current in milliamps
 */
function computeCurrent( voltage, resistance ) {
  return 1000 * voltage / resistance;
}

ohmsLaw.register( 'OhmsLawModel', OhmsLawModel );

export default OhmsLawModel;