/**
 * Copyright 2002-2013, University of Colorado
 * View of Single Battery
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Matrix3 = require( 'DOT/Matrix3' );
  var LinearFunction = require( 'DOT/LinearFunction' );

  function BatteryView( x, y, totWidth ) {
    Node.call( this, {x: x, y: y} );
    totWidth -= 4;
    var voltageToScale = new LinearFunction( 0.1, 1.5, 0.0001, 1, true ),
      w = [totWidth * 72 / 78, totWidth * 6 / 78],
      h = 40,
      linearGradient1 = new LinearGradient( 0, 0, 0, h )
        .addColorStop( 0, "#c3c3c3" )
        .addColorStop( 0.3, "#f9f9f9" )
        .addColorStop( 1, "#404040" ),
      linearGradient2 = new LinearGradient( 0, 0, 0, h )
        .addColorStop( 0, "#cc4e00" )
        .addColorStop( 0.3, "#dddad6" )
        .addColorStop( 1, "#cc4e00" ),
      linearGradient3 = new LinearGradient( 0, 0, 0, h )
        .addColorStop( 0, "#777777" )
        .addColorStop( 0.3, "#bdbdbd" )
        .addColorStop( 1, "#2b2b2b" ),
      battery = new Node(),
      batteryVoltage,
      batteryVoltage2,
      batteryVoltage3,
      batteryText = new Node( {centerY: -7, x: 3} ),
      batteryTextValue = new Text( "1.5", {'fontFamily': "Verdana", fontSize: 18, fontWeight: "bold"} );

    battery.addChild( batteryVoltage = new Rectangle( 0, 0, w[0], h, {stroke: "#000", lineWidth: 1, fill: linearGradient3, y: -h / 2} ) );
    battery.addChild( batteryVoltage2 = new Rectangle( 0, 0, w[1], h, {stroke: "#000", lineWidth: 1, fill: linearGradient2, y: -h / 2, x: w[0]} ) );
    battery.addChild( batteryVoltage3 = new Rectangle( w[1], 0, 4, 12, {stroke: "#000", lineWidth: 1, fill: linearGradient1, y: -6, x: w[0]} ) );
    this.addChild( battery );
    this.addChild( batteryText );
    batteryText.addChild( batteryTextValue );
    batteryText.addChild( new Text( "V", {'fontFamily': "Verdana", fontSize: 18, fill: "blue", fontWeight: "bold", x: 37 } ) );
    this.setVoltage = function( voltage ) {
      if ( voltage >= 1.5 ) {
        this.setVisible( true );
        batteryText.centerY = -7;
      }
      else if ( voltage <= 0 ) {
        this.setVisible( false );
      }
      else {
        this.setVisible( true );
        batteryText.centerY = -32;
      }
      batteryTextValue.text = voltage.toFixed( 1 );
      batteryVoltage.matrix = new Matrix3();
      batteryVoltage.scale( voltageToScale( voltage ), 1 );
      batteryVoltage.centerY = 0;
      batteryVoltage2.x = batteryVoltage.right;
      batteryVoltage3.x = batteryVoltage.right;
    };
  }

  inherit( Node, BatteryView );
  return BatteryView;
} );