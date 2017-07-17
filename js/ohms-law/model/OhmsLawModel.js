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
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var TNumber = require( 'ifphetio!PHET_IO/types/TNumber' );

  /**
   * The main model function, used to compute the current of the model
   * @param voltage
   * @param resistance
   * @returns {number} - current in milliamps
   */
  function computeCurrent( voltage, resistance ) {
    return 1000 * voltage / resistance;
  }

  /**
   * @constructor
   */
  function OhmsLawModel( tandem ) {

    // @public {Property.<number>} in volts
    this.voltageProperty = new NumberProperty( OhmsLawConstants.VOLTAGE_RANGE.getDefaultValue(), {
      tandem: tandem.createTandem( 'voltageProperty' ),
      phetioValueType: TNumber( {
        units: 'volts',
        range: OhmsLawConstants.VOLTAGE_RANGE
      } )
    } );

    // @public {Property.<number>} in Ohms
    this.resistanceProperty = new NumberProperty( OhmsLawConstants.RESISTANCE_RANGE.getDefaultValue(), {
      tandem: tandem.createTandem( 'resistanceProperty' ),
      phetioValueType: TNumber( {
        units: 'ohms',
        range: OhmsLawConstants.RESISTANCE_RANGE
      } )
    } );

    // @public {Property.<number>} create a derived property that tracks the current in milli amps
    this.currentProperty = new DerivedProperty( [ this.voltageProperty, this.resistanceProperty ],
      computeCurrent, {
        tandem: tandem.createTandem( 'currentProperty' ),
        phetioValueType: TNumber( {
          units: 'milliamperes'
        } )
      } );
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
     * Get the maximum current that can be computed by the model
     * @returns {number} - the max current.
     * @public
     */
    getMaxCurrent: function() {
      return computeCurrent( OhmsLawConstants.VOLTAGE_RANGE.max, OhmsLawConstants.RESISTANCE_RANGE.min );
    }
  } );
} );
