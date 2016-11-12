// Copyright 2013-2015, University of Colorado Boulder

/**
 * Primary model for the Ohm's Law simulation
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Sound = require( 'VIBE/Sound' );
  var Util = require( 'DOT/Util' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );

  // audio
  var addBatteryAudio = require( 'audio!OHMS_LAW/add-battery' );
  var removeBatteryAudio = require( 'audio!OHMS_LAW/remove-battery' );

  var INITIAL_VOLTAGE = 4.5;
  var INITIAL_RESISTANCE = 500;

  /**
   * @constructor
   */
  function OhmsLawModel() {

    PropertySet.call( this, {
      voltage: INITIAL_VOLTAGE,
      resistance: INITIAL_RESISTANCE,
      current: this.calculateCurrent( INITIAL_VOLTAGE, INITIAL_RESISTANCE ),
      soundActive: true
    } );

    var self = this;

    // Hook up the sounds that are played when batteries are added or removed.
    var addBatterySound = new Sound( addBatteryAudio );
    var removeBatterySound = new Sound( removeBatteryAudio );
    var oldVal = Math.floor( self.voltage / 1.5 );

    self.voltageProperty.link( function( voltage ) {
      var newVal = Math.floor( ( voltage ) / 1.5 );
      if ( self.soundActive ) {
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
      self.current = self.calculateCurrent( self.voltage, self.resistance );
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

  inherit( PropertySet, OhmsLawModel, {

    // @public
    step: function() { },

    // @public
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.current = this.calculateCurrent( this.voltage, this.resistance );
    },

    // @private
    calculateCurrent: function( voltage, resistance ) {
      return Math.round( voltage / resistance * 1000 * 10 ) / 10;
    }
  } );
  return OhmsLawModel;
} );
