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
  var NumberProperty = require( 'AXON/NumberProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Sound = require( 'VIBE/Sound' );
  var Util = require( 'DOT/Util' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );

  // audio
  var addBatteryAudio = require( 'audio!OHMS_LAW/add-battery' );
  var removeBatteryAudio = require( 'audio!OHMS_LAW/remove-battery' );

  var INITIAL_VOLTAGE = 4.5;  // in Volts
  var INITIAL_RESISTANCE = 500; // in Ohms

  /**
   * @constructor
   */
  function OhmsLawModel() {

    var self = this;

    this.voltageProperty = new NumberProperty( INITIAL_VOLTAGE );
    this.resistanceProperty = new NumberProperty( INITIAL_RESISTANCE );
    this.soundActiveProperty = new BooleanProperty( true );
    // TODO: a derivedProperty would seem more appropriate
    this.currentProperty = new NumberProperty( this.calculateCurrent( INITIAL_VOLTAGE, INITIAL_RESISTANCE ) );

    // Hook up the sounds that are played when batteries are added or removed.
    var addBatterySound = new Sound( addBatteryAudio );
    var removeBatterySound = new Sound( removeBatteryAudio );
    var oldVal = Math.floor( this.voltageProperty.value / 1.5 );

    this.voltageProperty.link( function( voltage ) {
      var newVal = Math.floor( ( voltage ) / 1.5 );
      if ( self.soundActiveProperty.value ) {
        if ( newVal > oldVal ) {
          addBatterySound.play();
        }
        else if ( newVal < oldVal ) {
          removeBatterySound.play();
        }
      }
      oldVal = newVal;
    } );

    var updateCurrent = function() {
      self.currentProperty.value = self.calculateCurrent( self.voltageProperty.value, self.resistanceProperty.value );
    };
    this.voltageProperty.link( updateCurrent );
    this.resistanceProperty.link( updateCurrent );

    //@override voltage.set (accuracy 0.1)
    var oldVS = this.voltageProperty.set.bind( this.voltageProperty );
    this.voltageProperty.set = function( val ) {
      oldVS( Util.roundSymmetric( val * 10 ) / 10 );
    };

    //@override resistance.set (accuracy 0)
    var oldRS = this.resistanceProperty.set.bind( this.resistanceProperty );
    this.resistanceProperty.set = function( val ) {
      oldRS( Util.roundSymmetric( val ) );
    };
    this.reset();
  }

  ohmsLaw.register( 'OhmsLawModel', OhmsLawModel );

  inherit( Object, OhmsLawModel, {

    // @public
    step: function() { },

    /**
     * resets the properties of the model
     * @public
     */
    reset: function() {
      this.voltageProperty.reset();
      this.resistanceProperty.reset();
      this.soundActiveProperty.reset();
      this.currentProperty.reset();
    },

    /**
     * calculate the current in milli amps
     * @param {number} voltage
     * @param {number} resistance
     * @returns {number}
     * @private
     */
    calculateCurrent: function( voltage, resistance ) {
      return Math.round( voltage / resistance * 1000 * 10 ) / 10;
    }
  } );
  return OhmsLawModel;
} );
