/**
 * Copyright 2002-2013, University of Colorado
 * View of Single Battery
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // Resources
  var voltageUnits = require( 'string!OHMS_LAW/voltageUnits' );

  // Constants
  var FONT = new PhetFont( { size: 20, weight: 'bold' } );

  function BatteryView( x, y, totWidth ) {
    Node.call( this, { x: x, y: y } );
    var nubWidth = 4;
    totWidth -= nubWidth;
    var voltageToScale = new LinearFunction( 0.1, 1.5, 0.0001, 1, true ),
      mainBodyWidth = totWidth * 72 / 78,
      copperPortionWidth = totWidth * 6 / 78,
      height = 40,
      mainBodyFill = new LinearGradient( 0, 0, 0, height )
        .addColorStop( 0, "#777777" )
        .addColorStop( 0.3, "#bdbdbd" )
        .addColorStop( 1, "#2b2b2b" ),
      copperPortionFill = new LinearGradient( 0, 0, 0, height )
        .addColorStop( 0, "#cc4e00" )
        .addColorStop( 0.3, "#dddad6" )
        .addColorStop( 1, "#cc4e00" ),
      nubFill = "#dddddd",
      battery = new Node(),
      mainBody,
      copperPortion,
      nub,
      batteryText = new Node( { centerY: -7, x: 3 } ),
      batteryTextValue = new Text( "1.5", { font: FONT } );

    battery.addChild( mainBody = new Rectangle( 0, 0, mainBodyWidth, height, { stroke: "#000", lineWidth: 1, fill: mainBodyFill, y: -height / 2 } ) );
    battery.addChild( copperPortion = new Rectangle( 0, 0, copperPortionWidth, height, {
      stroke: "#000",
      lineWidth: 1,
      fill: copperPortionFill,
      y: -height / 2,
      x: mainBodyWidth
    } ) );
    battery.addChild( nub = new Rectangle( copperPortionWidth, 0, nubWidth, 12, {
      stroke: "#000",
      lineWidth: 1,
      fill: nubFill,
      y: -6,
      x: mainBodyWidth
    } ) );
    this.addChild( battery );
    this.addChild( batteryText );
    batteryText.addChild( batteryTextValue );
    var voltageStringMaxWidth = new Text( "9.9", { font: FONT } ).width;
    batteryText.addChild( new Text( voltageUnits, { font: FONT, fill: "blue", x: voltageStringMaxWidth * 1.1 } ) );

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
      if ( this.isVisible() ) {
        batteryTextValue.text = voltage.toFixed( 1 );
        mainBody.setRect( 0, 0, mainBodyWidth * voltageToScale( voltage ), height, 0, 0 );
        copperPortion.x = mainBody.right;
        nub.x = mainBody.right;
      }
    };
  }

  inherit( Node, BatteryView );
  return BatteryView;
} );
