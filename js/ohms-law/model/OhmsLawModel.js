// Copyright 2013-2017, University of Colorado Boulder

/**
 * Primary model for the Ohm's Law simulation, see doc/model.md for more information.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var Range = require( 'DOT/Range' );
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );
  var TDerivedProperty = require( 'AXON/TDerivedProperty' );

  /**
   * @constructor
   */
  function OhmsLawModel( tandem ) {

    // @public {Property.<number>} in volts
    this.voltageProperty = new NumberProperty( OhmsLawConstants.VOLTAGE_RANGE.getDefaultValue(), {
      tandem: tandem.createTandem( 'voltageProperty' ),
      units: 'volts',
      range: OhmsLawConstants.VOLTAGE_RANGE
    } );

    // @public {Property.<number>} in Ohms
    this.resistanceProperty = new NumberProperty( OhmsLawConstants.RESISTANCE_RANGE.getDefaultValue(), {
      tandem: tandem.createTandem( 'resistanceProperty' ),
      units: 'ohms',
      range: OhmsLawConstants.RESISTANCE_RANGE
    } );

    // @public {Property.<number>} create a derived property that tracks the current in milli amps
    this.currentProperty = new DerivedProperty( [ this.voltageProperty, this.resistanceProperty ],
      computeCurrent, {
        tandem: tandem.createTandem( 'currentProperty' ),
        units: 'milliamperes',
        phetioType: TDerivedProperty( TNumber )
      } );
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

  return inherit( Object, OhmsLawModel, {

    /**
     * resets the properties of the model
     * @public
     */
    reset: function() {
      this.voltageProperty.reset();
      this.resistanceProperty.reset();
    },

    /**
     * Get the normalized voltage over the range of allowed voltages in this sim.
     *
     * @return {number}
     */
    getNormalizedVoltage: function() {
      var range = OhmsLawConstants.VOLTAGE_RANGE;
      return ( this.voltageProperty.get() - range.min ) / range.getLength();
    },

    /**
     * Get the normalized current, based on the allowable values for current in this sim.
     * @return {number}
     */
    getNormalizedCurrent: function() {
      var range = OhmsLawModel.getCurrentRange();
      return ( this.currentProperty.get() - range.min ) / range.getLength();
    },

    /**
     * Get the normalized resistance, based on the allowable values for resistance in this
     * sim.
     * @return {number}
     */
    getNormalizedResistance: function() {
      var range = OhmsLawConstants.RESISTANCE_RANGE;
      return ( this.resistanceProperty.get() - range.min ) / range.getLength();
    }
  }, {

    /**
     * Get the maximum current that can be computed by the model
     * @returns {number} - the max current.
     * @public
     */
    getMaxCurrent: function() {
      return computeCurrent( OhmsLawConstants.VOLTAGE_RANGE.max, OhmsLawConstants.RESISTANCE_RANGE.min );
    },

    /**
     * Get the minimum current that can be computed by the model.
     * @return {number} [description]
     */
    getMinCurrent: function() {
      return computeCurrent( OhmsLawConstants.VOLTAGE_RANGE.min, OhmsLawConstants.RESISTANCE_RANGE.max );
    },

    /**
     * Get the Range of the current, will construct a new range if not yet set
     * @returns {Range}
     */
    getCurrentRange: function() {

      if ( !this.currentRange ) {

        // @private, use the getter
        this.currentRange = new Range( OhmsLawModel.getMinCurrent(), OhmsLawModel.getMaxCurrent() );
      }
      return this.currentRange;
    }
  } );
} );
