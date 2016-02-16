// Copyright 2016, University of Colorado Boulder

/**
 * Main container for all part of scene
 * @author Vasily Shakhov (Mlearner)
 * @author Anton Ulyanov (Mlearner)
 */
define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var WireBox = require( 'OHMS_LAW/ohms-law/view/WireBox' );
  var SlidersBox = require( 'OHMS_LAW/ohms-law/view/SlidersBox' );
  var FormulaView = require( 'OHMS_LAW/ohms-law/view/FormulaView' );

  /**
   * @param {OhmsLawModel} model
   * @constructor
   */
  function RootNode( model ) {
    Node.call( this );
    this.addChild( new FormulaView( model ).mutate( { pickable: false } ) );
    this.addChild( new WireBox( model ).mutate( { pickable: false } ) );
    this.addChild( new SlidersBox( model ) );
  }

  return inherit( Node, RootNode );
} );
