// Copyright 2016, University of Colorado Boulder

/**
 * View All Batteries
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var BatteryView = require( 'OHMS_LAW/ohms-law/view/BatteryView' );
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
    var maxQ = 9 / 1.5;

    //1 battery width
    var batWidth = 82;

    //batteries presentation
    var bats = new Array( Math.ceil( maxQ ) );

    for ( var i = 0, l = bats.length; i < l; i++ ) {
      var sx = i * batWidth;
      bats[ i ] = new BatteryView( sx, 0, batWidth );
      this.addChild( bats[ i ] );
    }

    voltageProperty.link( function setVoltage( voltage ) {
      var val = voltage;
      for ( var i = 0, l = bats.length; i < l; i++ ) {
        var diff = Math.min( 1.5, val );
        bats[ i ].setVoltage( diff );
        val -= diff;
      }
    } );
  }

  ohmsLaw.register( 'BatteriesView', BatteriesView );

  return inherit( Node, BatteriesView );
} );