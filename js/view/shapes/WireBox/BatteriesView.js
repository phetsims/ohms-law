// Copyright 2002-2013, University of Colorado Boulder

/**
 * Copyright 2002-2013, University of Colorado
 * View All Batteries
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */


define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var BatteryView = require( 'view/shapes/WireBox/BatteryView' );

  function BatteriesView( model, x, y ) {
    Node.call( this, {x: x, y: y} );

    //max number of batteries
    var maxQ = model.VOLTAGEMAX / 1.5;

    //1 battery width
    var batWidth = 82;

    //batteries presentation
    var bats = new Array( Math.ceil( maxQ ) );

    for ( var i = 0, l = bats.length; i < l; i++ ) {
      var sx = i * batWidth;
      bats[i] = new BatteryView( sx, 0, batWidth );
      this.addChild( bats[i] );
    }

    model.voltageProperty.link( function setVoltage( voltage ) {
      var val = voltage;
      for ( var i = 0, l = bats.length; i < l; i++ ) {
        var diff = Math.min( 1.5, val );
        bats[i].setVoltage( diff );
        val -= diff;
      }
    } );
  }

  inherit( Node, BatteriesView );
  return BatteriesView;
} );