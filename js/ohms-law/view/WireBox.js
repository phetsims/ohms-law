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

    // for positioning, the top left corner of the wireFrame is defined as 0,0
    var wireFrame = new Rectangle( 0, 0, WIDTH, HEIGHT, 4, 4, { stroke: '#000', lineWidth: THICKNESS } );
    var bottomLeftArrow = new RightAngleArrow( currentProperty, { x: -10, y: HEIGHT + 10, rotation: Math.PI / 2 } );
    var bottomRightArrow = new RightAngleArrow( currentProperty, { x: WIDTH + 10, y: HEIGHT + 10, rotation: 0 } );
    var currentReadoutPanel = new ReadoutPanel( currentProperty );
    var resistorNode = new ResistorNode( resistanceProperty );
    var batteriesView = new BatteriesView( voltageProperty );

    this.addChild( wireFrame );
    this.addChild( batteriesView );
    this.addChild( resistorNode );
    this.addChild( bottomLeftArrow );
    this.addChild( bottomRightArrow );
    this.addChild( currentReadoutPanel );

    batteriesView.left = 30;
    batteriesView.centerY = 0;
    currentReadoutPanel.centerY = HEIGHT / 2;
    currentReadoutPanel.centerX = WIDTH / 2;
    resistorNode.centerX = WIDTH / 2;
    resistorNode.centerY = HEIGHT;
  }

  ohmsLaw.register( 'WireBox', WireBox );

  return inherit( Node, WireBox );
} );