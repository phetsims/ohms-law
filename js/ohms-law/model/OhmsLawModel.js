// Copyright 2013-2015, University of Colorado Boulder

/**
 * Primary model for the Ohm's Law simulation
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );
  var Sound = require( 'VIBE/Sound' );

  // audio
  var addBatteryAudio = require( 'audio!OHMS_LAW/add-battery' );
  var removeBatteryAudio = require( 'audio!OHMS_LAW/remove-battery' );

  /**
   * @constructor
   */
  function OhmsLawModel() {

    var self = this;

    // @public {Property.<number>} in volts
    this.voltageProperty = new NumberProperty( OhmsLawConstants.VOLTAGE_RANGE.getDefaultValue() );

    // @public {Property.<number>} in Ohms
    this.resistanceProperty = new NumberProperty( OhmsLawConstants.RESISTANCE_RANGE.getDefaultValue() );

    // @public {Property.<boolean>}
    this.soundActiveProperty = new BooleanProperty( true );

    // @public {Property.<number>} create a derived property that tracks the current in milli amps
    this.currentProperty = new DerivedProperty( [ this.voltageProperty, this.resistanceProperty ],
      function( voltage, resistance ) {
        return 1000 * voltage / resistance;
      } );

    // Hook up the sounds that are played when batteries are added or removed.
    var addBatterySound = new Sound( addBatteryAudio );
    var removeBatterySound = new Sound( removeBatteryAudio );

    // play sounds when adding or removing a battery
    this.voltageProperty.lazyLink( function( voltage, oldVoltage ) {
      var newNumberBatteries = Math.floor( voltage / OhmsLawConstants.AA_VOLTAGE );
      var oldNumberBatteries = Math.floor( oldVoltage / OhmsLawConstants.AA_VOLTAGE );
      if ( self.soundActiveProperty.value ) {
        if ( newNumberBatteries > oldNumberBatteries ) {
          addBatterySound.play();
        }
        else if ( newNumberBatteries < oldNumberBatteries ) {
          removeBatterySound.play();
        }
      }
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
      this.soundActiveProperty.reset();
    }
  } );
} );
