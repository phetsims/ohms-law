// Copyright 2016, University of Colorado Boulder

/**
 * view scheme ohms law
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var OhmsLawConstants = require( 'OHMS_LAW/ohms-law/OhmsLawConstants' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var ReadoutPanel = require( 'OHMS_LAW/ohms-law/view/ReadoutPanel' );
  var BatteriesView = require( 'OHMS_LAW/ohms-law/view/BatteriesView' );
  var ResistorNode = require( 'OHMS_LAW/ohms-law/view/ResistorNode' );
  var RightAngleArrow = require( 'OHMS_LAW/ohms-law/view/RightAngleArrow' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );

  // constants
  var WIDTH = OhmsLawConstants.WIRE_WIDTH;
  var HEIGHT = OhmsLawConstants.WIRE_HEIGHT;
  var THICKNESS = OhmsLawConstants.WIRE_THICKNESS;

  /**
   * @param {Property.<number>} voltageProperty
   * @param {Property.<number>} resistanceProperty
   * @param {Property.<number>} currentProperty
   * @constructor
   */
  function WireBox( voltageProperty, resistanceProperty, currentProperty ) {

    Node.call( this );

    // empirically determined position
    var x = 70;
    var y = 380;

    this.addChild( new RightAngleArrow( currentProperty, x - 10, y + HEIGHT + 10, 90 ) );
    this.addChild( new RightAngleArrow( currentProperty, x + WIDTH + 10, y + HEIGHT + 10, 0 ) );
    this.addChild( new Rectangle( x, y, WIDTH, HEIGHT, THICKNESS, THICKNESS, { stroke: '#000', lineWidth: 10 } ) );
    this.addChild( new ReadoutPanel( currentProperty ).mutate( {
      centerX: x + WIDTH / 2,
      centerY: y + HEIGHT / 2
    } ) );
    this.addChild( new BatteriesView( voltageProperty, x + 30, y ) );

    var resistorNode = new ResistorNode( resistanceProperty );
    this.addChild( resistorNode );
    resistorNode.centerX = x + WIDTH / 2;
    resistorNode.centerY = y + HEIGHT;
  }

  ohmsLaw.register( 'WireBox', WireBox );

  return inherit( Node, WireBox );
} );