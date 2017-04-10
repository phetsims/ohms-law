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
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var CurrentValueBox = require( 'OHMS_LAW/ohms-law/view/CurrentValueBox' );
  var BatteriesView = require( 'OHMS_LAW/ohms-law/view/BatteriesView' );
  var ResistorView = require( 'OHMS_LAW/ohms-law/view/ResistorView' );
  var RightAngleArrow = require( 'OHMS_LAW/ohms-law/view/RightAngleArrow' );
  var ohmsLaw = require( 'OHMS_LAW/ohmsLaw' );

  // constants
  var WIDTH = 550;
  var HEIGHT = 180;

  /**
   * @param {OhmsLawModel} model
   * @constructor
   */
  function WireBox( model ) {

    Node.call( this );

    // empirically determined position
    var x = 70;
    var y = 380;

    this.addChild( new RightAngleArrow( model.currentProperty, x - 10, y + HEIGHT + 10, 90 ) );
    this.addChild( new RightAngleArrow( model.currentProperty, x + WIDTH + 10, y + HEIGHT + 10, 0 ) );
    this.addChild( new Rectangle( x, y, WIDTH, HEIGHT, 4, 4, { stroke: '#000', lineWidth: 10 } ) );
    this.addChild( new CurrentValueBox( model.currentProperty, WIDTH * 0.7, HEIGHT * 0.3 ).mutate( {
      centerX: x + WIDTH / 2,
      centerY: y + HEIGHT / 2
    } ) );
    this.addChild( new BatteriesView( model.voltageProperty, x + 30, y ) );
    this.addChild( new ResistorView( model.resistanceProperty, x, y, WIDTH, HEIGHT ) );
  }

  ohmsLaw.register( 'WireBox', WireBox );

  return inherit( Node, WireBox );
} );