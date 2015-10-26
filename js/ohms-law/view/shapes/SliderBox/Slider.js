// Copyright 2002-2013, University of Colorado Boulder

/**
 * view for vertical slider control
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var LinearFunction = require( 'DOT/LinearFunction' );

  // constants
  var KNOB_WIDTH = 32;  // Empirically determined.

  function Slider( x, y, h, targetProperty, img, value ) {
    var thisNode = this;
    Node.call( this, { x: x, y: y } );
    this.addChild( new Rectangle( -3, 0, 6, h, { fill: 'black' } ) );

    var knob = new Image( img, { cursor: 'pointer' } );
    knob.scale( KNOB_WIDTH / knob.width );
    knob.mutate( { centerX: 0, top: 0 } );
    knob.touchArea = knob.localBounds.dilateXY( 60, 40 ); // Expand touch area for easier use on tablets.

    var clickYOffset;
    var yMin = 0;
    var yMax = h - knob.height;

    var valueToPosition = new LinearFunction( value.min, value.max, yMax, yMin, true ),
      positionToValue = new LinearFunction( yMax, yMin, value.min, value.max, true );
    this.addChild( knob );
    knob.addInputListener( new SimpleDragHandler(
      {
        // Allow moving a finger (touch) across this node to interact with it
        allowTouchSnag: true,

        start: function( event ) {
          clickYOffset = thisNode.globalToParentPoint( event.pointer.point ).y - event.currentTarget.y;
        },

        drag: function( event ) {
          var y = thisNode.globalToParentPoint( event.pointer.point ).y - clickYOffset;
          y = Math.max( Math.min( y, yMax ), yMin );
          targetProperty.set( positionToValue( y ) );
        }
      } ) );
    targetProperty.link( function( value ) {
      knob.y = valueToPosition( value );
    } );
  }

  inherit( Node, Slider );

  return Slider;
} );