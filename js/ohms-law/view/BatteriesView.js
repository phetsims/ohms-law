// Copyright 2016, University of Colorado Boulder

/**
 * View of the battery pack at the top of the wire
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var BatteryView = require( 'OHMS_LAW/ohms-law/view/BatteryView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );

  /**
   * @param {Property.<number>} voltageProperty
   * @constructor
   */
  function BatteriesView( voltageProperty ) {
    Node.call( this );

    // max number of batteries
    var maxNumberBatteries = Math.ceil( OhmsLawConstants.VOLTAGE_RANGE.max / OhmsLawConstants.AA_VOLTAGE );

    // store battery nodes in an array
    var batteries = [];

    // create an array of batteries
    for ( var i = 0; i < maxNumberBatteries; i++ ) {
      var leftPosition = i * OhmsLawConstants.BATTERY_WIDTH;
      var battery = new BatteryView( { x: leftPosition, y: 0 } );
      this.addChild( battery );
      batteries.push( battery );
    }

    // present for the lifetime of the simulation
    voltageProperty.link( function( voltage ) {

      batteries.forEach( function( battery, index ) {
        // determine associated with a particular battery
        var voltageBattery = Math.min( OhmsLawConstants.AA_VOLTAGE, voltage - index * OhmsLawConstants.AA_VOLTAGE );

        // set the visibility of the battery
        battery.visible = ( voltageBattery > 0 );

        if ( battery.visible ) {
          battery.setVoltage( voltageBattery );
        }
      } );
    } );
  }

  ohmsLaw.register( 'BatteriesView', BatteriesView );

  return inherit( Node, BatteriesView );
} );