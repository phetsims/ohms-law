/**
 * Copyright 2002-2013, University of Colorado
 * view scheme ohms law
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */

define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var CurrentValueBox = require( 'view/shapes/WireBox/CurrentValueBox' );
  var BatteriesView = require( 'view/shapes/WireBox/BatteriesView' );
  var ResistorView = require( 'view/shapes/WireBox/ResistorView' );
  var Arrow = require( 'view/shapes/WireBox/Arrow' );

  function WireBox( model ) {
    Node.call( this );
    var x = 70,
      y = 400,
      w = 550,
      h = 180;

    this.addChild( new Arrow( model, x - 10, y + h + 10, 90 ) );
    this.addChild( new Arrow( model, x + w + 10, y + h + 10, 0 ) );

    this.addChild( new Rectangle( x, y, w, h, 4, 4, {stroke: "#000", lineWidth: 10} ) );
    this.addChild( new CurrentValueBox( model, w * 0.7, h * 0.3 ).mutate( { centerX: x + w / 2, centerY: y + h / 2 } ) );
    this.addChild( new BatteriesView( model, x + 30, y ) );
    this.addChild( new ResistorView( model, x, y, w, h ) );
  }

  inherit( Node, WireBox );

  return WireBox;
} );