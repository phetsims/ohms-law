// Copyright 2013-2015, University of Colorado Boulder

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
  var BatteryView = require( 'OHMS_LAW/ohms-law/view/shapes/WireBox/BatteryView' );

  /**
   * @param {OhmsLawModel} model
   * @param x
   * @param y
   * @constructor
   */
  function BatteriesView( model, x, y ) {
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

    model.voltageProperty.link( function setVoltage( voltage ) {
      var val = voltage;
      for ( var i = 0, l = bats.length; i < l; i++ ) {
        var diff = Math.min( 1.5, val );
        bats[ i ].setVoltage( diff );
        val -= diff;
      }
    } );
  }

  return inherit( Node, BatteriesView );
} );