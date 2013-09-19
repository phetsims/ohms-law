/**
 * Model container for the "OhmsLaw" module.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Sound = require( 'VIBE/Sound' );

  function OhmsLawModel() {
    PropertySet.call( this, {
      voltage: 4.5,
      resistance: 500,
      current: 0,
      soundActive: true
    } );

    var thisModel = this;

    // Hook up the sounds that are played when batteries are added or removed.
    var addBatterySound = new Sound( 'audio/add-battery.mp3' );
    var removeBatterySound = new Sound( 'audio/remove-battery.mp3' );
    var oldVal = Math.floor( thisModel.voltage / 1.5 );

    thisModel.voltageProperty.link( function( voltage ) {
      var newVal = Math.floor( ( voltage ) / 1.5 );
      if ( thisModel.soundActive ) {
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
      thisModel.current = thisModel.calculateCurrent( thisModel.voltage, thisModel.resistance );
    };
    this.voltageProperty.link( updateCurrent );
    this.resistanceProperty.link( updateCurrent );

    //@override voltage.set (accuracy 0.1)
    var oldVS = this.voltageProperty.set.bind( this.voltageProperty );
    this.voltageProperty.set = function( val ) {
      oldVS( Math.round( val * 10 ) / 10 );
    };

    //@override resistance.set (accuracy 0)
    var oldRS = this.resistanceProperty.set.bind( this.resistanceProperty );
    this.resistanceProperty.set = function( val ) {
      oldRS( Math.round( val ) );
    };
    this.reset();
  }

  inherit( PropertySet, OhmsLawModel, {
    step: function() { },
    reset: function() {
      this.voltageProperty.reset();
      this.resistanceProperty.reset();
      this.soundActiveProperty.reset();
      this.current = this.calculateCurrent( this.voltage, this.resistance );
    },
    calculateCurrent: function( voltage, resistance ) {
      return Math.round( voltage / resistance * 1000 * 10 ) / 10;
    }
  } );
  return OhmsLawModel;
} );
