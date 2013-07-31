/**
 * Model Audio for the "OhmsLaw".
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';
  var Sound = require( 'util/Sound' );

  function AudioModel( model ) {
    var thisModel = this;
    this.sounds = [];
    for ( var i = 0; i < model.VOLTAGEMAX / 1.5; i++ ) {
      this.sounds.push( {
          'addBattery': new Sound( 'add-battery' ),
          'removeBattery': new Sound( 'remove-battery' )
        }
      );
    }
    var oldVal = Math.floor( model.voltage / 1.5 );

    model.voltageProperty.link( function playSound( value ) {
      var newVal = Math.floor( (value) / 1.5 );
      if ( model.soundActive ) {
        if ( newVal > oldVal ) {
          if ( thisModel.sounds[newVal] ) {
            thisModel.sounds[newVal].addBattery.play();
          }
        }
        else if ( newVal < oldVal ) {
          if ( thisModel.sounds[newVal] ) {
            thisModel.sounds[newVal].removeBattery.play();
          }
        }
      }
      oldVal = newVal;
    } );

    return this.sounds;
  }

  return AudioModel;
} );
