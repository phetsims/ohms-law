/**
 * Model container for the "OhmsLaw" module.
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var AudioModel = require( 'model/AudioModel' );


  function OhmsLawModel() {
    var thisModel = this;

    this.VOLTAGEMAX = 9;
    this.VOLTAGEMIN = 0.1;
    this.VOLTAGEDEFAULT = 4.5;
    this.RESISTANCEMAX = 1000;
    this.RESISTANCEMIN = 10;
    this.RESISTANCEDEFAULT = 500;

    PropertySet.call( this, {
      voltage: this.VOLTAGEDEFAULT,
      resistance: this.RESISTANCEDEFAULT,
      current: 0,
      soundActive: true
    } );

    this.sounds = new AudioModel( this );

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
      this.voltage = this.VOLTAGEDEFAULT;
      this.resistance = this.RESISTANCEDEFAULT;
      this.soundActive = true;
      this.current = this.calculateCurrent( this.voltage, this.resistance );
    },
    calculateCurrent: function( voltage, resistance ) {
      return Math.round( voltage / resistance * 1000 * 10 ) / 10;
    }
  } );
  return OhmsLawModel;
} );
