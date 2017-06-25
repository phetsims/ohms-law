// Copyright 2016-2017, University of Colorado Boulder

/**
 * View circuit with a resistor, a battery pack, two current arrows and a current readout panel
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
  var OFFSET = 10;  // position offset for the RightAngleArrow

  /**
   * @param {OhmsLawModel} model
   * @param {Object} options
   * @constructor
   */
  function WireBox( model, options ) {

    Node.call( this );

    // For positioning, the top left corner of the wireFrame is defined as 0,0
    var wireFrame = new Rectangle( 0, 0, WIDTH, HEIGHT, 4, 4, { stroke: '#000', lineWidth: THICKNESS } );
    this.addChild( wireFrame );

    var batteriesView = new BatteriesView( model.voltageProperty, {
      left: 30, // Slightly to the right of the wire
      centerY: 0
    } );
    this.addChild( batteriesView );

    var resistorNode = new ResistorNode( model.resistanceProperty, {
      centerX: WIDTH / 2,
      centerY: HEIGHT
    } );
    this.addChild( resistorNode );

    var bottomLeftArrow = new RightAngleArrow( model.currentProperty, {
      x: -OFFSET,
      y: HEIGHT + OFFSET,
      rotation: Math.PI / 2
    } );
    this.addChild( bottomLeftArrow );

    var bottomRightArrow = new RightAngleArrow( model.currentProperty, {
      x: WIDTH + OFFSET,
      y: HEIGHT + OFFSET,
      rotation: 0
    } );
    this.addChild( bottomRightArrow );

    var currentReadoutPanel = new ReadoutPanel( model.currentProperty, {
      centerY: HEIGHT / 2,
      centerX: WIDTH / 2
    } );
    this.addChild( currentReadoutPanel );

    this.mutate( options );
  }

  ohmsLaw.register( 'WireBox', WireBox );

  return inherit( Node, WireBox );
} );