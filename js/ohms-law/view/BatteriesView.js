// Copyright 2016-2017, University of Colorado Boulder

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
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function BatteriesView( voltageProperty, tandem, options ) {
    Node.call( this );

    // Max number of batteries
    var maxNumberBatteries = Math.ceil( OhmsLawConstants.VOLTAGE_RANGE.max / OhmsLawConstants.AA_VOLTAGE );
    var batteryWidth = ( OhmsLawConstants.WIRE_WIDTH - OhmsLawConstants.BATTERIES_OFFSET * 2 ) / maxNumberBatteries;

    // Store battery nodes in an array
    var batteries = [];

    var batteriesGroupTandem = tandem.createGroupTandem( 'battery' );
    // Create an array of batteries; enough to fill the entire wire.
    for ( var i = 0; i < maxNumberBatteries; i++ ) {
      var leftPosition = i * batteryWidth;
      var battery = new BatteryView( batteryWidth, batteriesGroupTandem.createNextTandem(), { x: leftPosition, y: 0 } );

      // Add them as children to this node, and to the array for manipulation
      this.addChild( battery );
      batteries.push( battery );
    }

    // Present for the lifetime of the simulation; no need to unlink.
    voltageProperty.link( function( voltage ) {

      batteries.forEach( function( battery, index ) {

        // Determine associated with a particular battery
        var voltageBattery = Math.min( OhmsLawConstants.AA_VOLTAGE, voltage - index * OhmsLawConstants.AA_VOLTAGE );

        // Battery is only visible if it has a voltage.
        battery.visible = ( voltageBattery > 0 );

        if ( battery.visible ) {
          battery.setVoltage( voltageBattery );
        }
      } );
    } );

    this.mutate( options );
  }

  ohmsLaw.register( 'BatteriesView', BatteriesView );

  return inherit( Node, BatteriesView );
} );