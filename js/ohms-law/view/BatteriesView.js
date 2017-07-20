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

    // Store battery nodes in an array
    var batteries = [];

    var batteriesGroupTandem = tandem.createGroupTandem( 'battery' );
    // Create an array of batteries; enough to fill the entire wire.
    for ( var i = 0; i < OhmsLawConstants.MAX_NUMBER_OF_BATTERIES; i++ ) {
      var leftPosition = i * OhmsLawConstants.BATTERY_WIDTH;
      var battery = new BatteryView( batteriesGroupTandem.createNextTandem(), { x: leftPosition, y: 0 } );

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

    options.tandem = tandem;
    this.mutate( options );
  }

  ohmsLaw.register( 'BatteriesView', BatteriesView );

  return inherit( Node, BatteriesView );
} );