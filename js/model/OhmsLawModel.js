// Copyright 2002-2013, University of Colorado
/**
 * Model container for the "OhmsLaw" module.
 */
define(
  [
    '../../common/phetcommon/js/model/property/Property',
    'model/AudioModel'
  ],
  function ( Property, AudioModel ) {
    'use strict';
    function OhmsLawModel() {
      var self = this;

      //variables voltage, resistance, current
      this.init = function () {
        this.voltage = new Property();
        this.resistance = new Property();
        this.current = new Property();

        self.sounds = new AudioModel( self );

        this.voltage.addObserver( updateCurrent );
        this.resistance.addObserver( updateCurrent );

        //constants
        this.voltage.MAX = 9;
        this.voltage.MIN = 0.1;
        this.resistance.MAX = 1000;
        this.resistance.MIN = 10;

        //@override voltage.set (accuracy 0.1)
        var oldVS = this.voltage.set;
        this.voltage.set = function ( val ) {
          oldVS( (Math.round( val * 10 ) / 10).toFixed( 1 ) );
        };

        //@override resistance.set (accuracy 0)
        var oldRS = this.resistance.set;
        this.resistance.set = function ( val ) {
          oldRS( Math.round( val ) );
        };

        this.reset();
      };

      //initialize default values
      this.reset = function () {
        self.voltage.set( 4.5 );
        self.resistance.set( 500 );
        self.sounds.active.set( true );
        updateCurrent();
      };

      //sets current from V and R;
      var updateCurrent = function () {
        var val = self.voltage.get() / self.resistance.get() * 1000;
        self.current.set( (Math.round( val * 10 ) / 10).toFixed( 1 ) );
      };

      this.init();
    }

    return OhmsLawModel;
  } );
