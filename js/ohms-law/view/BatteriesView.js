// Copyright 2016, University of Colorado Boulder

/**
 * View All Batteries
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
   * @param {number} x
   * @param {number} y
   * @constructor
   */
  function BatteriesView( voltageProperty, x, y ) {
    Node.call( this, { x: x, y: y } );

    //max number of batteries
    var maxQ = 9 / OhmsLawConstants.AA_VOLTAGE;

    //1 battery width
    var batteryWidth = 82;

    //batteries presentation
    var batteries = new Array( Math.ceil( maxQ ) );

    for ( var i = 0, l = batteries.length; i < l; i++ ) {
      var sx = i * batteryWidth;
      batteries[ i ] = new BatteryView( sx, 0, batteryWidth );
      this.addChild( batteries[ i ] );
    }

    voltageProperty.link( function setVoltage( voltage ) {
      var val = voltage;
      for ( var i = 0, l = batteries.length; i < l; i++ ) {
        var diff = Math.min( OhmsLawConstants.AA_VOLTAGE, val );
        batteries[ i ].setVoltage( diff );
        val -= diff;
      }
    } );
  }

  ohmsLaw.register( 'BatteriesView', BatteriesView );

  return inherit( Node, BatteriesView );
} );